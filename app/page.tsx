import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Services from '@/components/Services';
import Stats from '@/components/Stats';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { prisma } from '@/lib/prisma';
import { Suspense } from 'react';
import { ProjectsGridSkeleton } from '@/components/Skeleton';
import { Skill, Project } from '@/types';

// Fallback data in case database is not connected
const fallbackProjects: Project[] = [];
const fallbackSkills: Skill[] = [];

async function getProjects(): Promise<Project[]> {
  try {
    // Check if DATABASE_URL is set before trying to query
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not found. Using fallback data for projects.');
      return fallbackProjects;
    }

    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    // Ensure data is plain object (Date serialization fix)
    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return fallbackProjects;
  }
}

async function getSkills(): Promise<Skill[]> {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn('DATABASE_URL not found. Using fallback data for skills.');
      return fallbackSkills;
    }

    const skills = await prisma.skill.findMany({
      orderBy: { name: 'asc' },
    });
    return skills as unknown as Skill[];
  } catch (error) {
    console.error('Error fetching skills:', error);
    return fallbackSkills;
  }
}

const ProjectsWrapper = async () => {
  const projects = await getProjects();
  return <Projects projects={projects} />;
};

export default async function Home() {
  const skills = await getSkills();

  return (
    <main>
      <Navbar />
      <Hero />
      <Suspense fallback={
        <section id="works" className="section">
          <div className="container">
            <ProjectsGridSkeleton />
          </div>
        </section>
      }>
        <ProjectsWrapper />
      </Suspense>
      <Services />
      <Stats />
      <Experience skills={skills} />
      <Contact />
      <Footer />
    </main>
  );
}
