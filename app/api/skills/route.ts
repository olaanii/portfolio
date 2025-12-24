import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET all skills (Public)
export async function GET() {
    try {
        const skills = await prisma.skill.findMany({
            orderBy: { category: 'asc' }
        });
        return NextResponse.json(skills);
    } catch (error) {
        console.error('Error fetching skills:', error);
        return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
    }
}

// POST create skill (Protected)
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const skill = await prisma.skill.create({
            data: {
                name: body.name,
                category: body.category,
                proficiency: body.proficiency || 50,
            },
        });

        return NextResponse.json(skill, { status: 201 });
    } catch (error) {
        console.error('Error creating skill:', error);
        return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
    }
}
