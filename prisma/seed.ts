import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const projects = [
    {
        id: 'veyra',
        title: 'Veyra',
        description: 'An AI-assisted workbench that turns a project brief into architecture, technology options, and actionable implementation tasks.',
        technologies: 'TypeScript, JavaScript, AI',
        githubLink: 'https://github.com/olaanii/veyra',
    },
    {
        id: 'afan-oromo-language',
        title: 'Afan Oromo Programming Language',
        description: 'A beginner language that translates Afan Oromo source files into Python through a lexer, parser, type checker, and code generator.',
        technologies: 'Python, Compiler',
        githubLink: 'https://github.com/olaanii/afan-oromo-PL',
    },
    {
        id: 'fluxx-nft-marketplace',
        title: 'FLUXX NFT Marketplace',
        description: 'A Sepolia testnet NFT minting and marketplace project with tiered rarity, wallet connection, and IPFS-hosted metadata.',
        technologies: 'Next.js, TypeScript, Solidity, IPFS',
        githubLink: 'https://github.com/olaanii/Fluxx---NFT-Minting-and-Marketplace',
    },
    {
        id: 'birr-blockchain',
        title: 'BIRR Blockchain',
        description: 'A Go blockchain prototype with delegated authority consensus, peer-to-peer networking, a custom VM, and a JSON-RPC API.',
        technologies: 'Go, Dart, Docker',
        githubLink: 'https://github.com/olaanii/birr',
    },
];

async function main() {
    console.log('Seeding verified public projects...');

    for (const project of projects) {
        const { id, ...data } = project;
        await prisma.project.upsert({
            where: { id },
            create: { id, ...data },
            update: data,
        });
    }

    console.log('Project seed complete.');
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
