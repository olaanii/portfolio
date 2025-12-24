import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding data...');

    // Add sample projects
    await prisma.project.create({
        data: {
            title: "Portfolio Website",
            description: "A personal portfolio built with Next.js and Flutter.",
            imageUrl: "https://placehold.co/600x400/1a1a1a/ffffff?text=Portfolio",
            technologies: "Next.js, Flutter, TypeScript",
            githubLink: "https://github.com",
        }
    });

    // Add sample skills
    const skills = [
        { name: "Next.js", category: "Frontend", proficiency: 90 },
        { name: "Flutter", category: "Mobile", proficiency: 85 },
        { name: "Node.js", category: "Backend", proficiency: 80 },
    ];

    for (const skill of skills) {
        await prisma.skill.create({ data: skill });
    }

    // Add sample experience
    await prisma.experience.create({
        data: {
            role: "Senior Developer",
            company: "Tech Corp",
            startDate: "2022-01",
            endDate: "Present",
            description: "Led development of multiple high-scale web applications.",
        }
    });


    console.log('Seeding finished!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
