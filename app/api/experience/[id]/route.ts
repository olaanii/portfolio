import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// PUT update experience (Protected)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        const experience = await prisma.experience.update({
            where: { id },
            data: {
                role: body.role,
                company: body.company,
                startDate: body.startDate,
                endDate: body.endDate,
                description: body.description,
            },
        });

        return NextResponse.json(experience);
    } catch (error) {
        console.error('Error updating experience:', error);
        return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
    }
}

// DELETE experience (Protected)
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        await prisma.experience.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Experience deleted' });
    } catch (error) {
        console.error('Error deleting experience:', error);
        return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
    }
}
