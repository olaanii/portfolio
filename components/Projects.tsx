import { Project } from '@/types';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';
import { Reveal } from './Reveal';

interface ProjectsProps {
    projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
    return (
        <section id="works" className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <Reveal width="100%">
                        <h2 className={styles.title}>Recent Works</h2>
                    </Reveal>
                    <Reveal width="100%">
                        <p className={styles.subtitle}>
                            A selection of projects that display my passion for building robust and scalable applications.
                        </p>
                    </Reveal>
                </div>

                <div className={styles.grid}>
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <Reveal key={project.id} width="100%">
                                <ProjectCard project={project} />
                            </Reveal>
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            <p>New projects coming soon...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
