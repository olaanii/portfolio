import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// PUT update skill (Protected)
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

        const skill = await prisma.skill.update({
            where: { id },
            data: {
                name: body.name,
                category: body.category,
                proficiency: body.proficiency,
            },
        });

        return NextResponse.json(skill);
    } catch (error) {
        console.error('Error updating skill:', error);
        return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
    }
}

// DELETE skill (Protected)
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
        await prisma.skill.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Skill deleted' });
    } catch (error) {
        console.error('Error deleting skill:', error);
        return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
    }
}
