import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET all experiences (Public)
export async function GET() {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: { startDate: 'desc' }
        });
        return NextResponse.json(experiences);
    } catch (error) {
        console.error('Error fetching experiences:', error);
        return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
    }
}

// POST create experience (Protected)
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const experience = await prisma.experience.create({
            data: {
                role: body.role,
                company: body.company,
                startDate: body.startDate,
                endDate: body.endDate || null,
                description: body.description || null,
            },
        });

        return NextResponse.json(experience, { status: 201 });
    } catch (error) {
        console.error('Error creating experience:', error);
        return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
    }
}
