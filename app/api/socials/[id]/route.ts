import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// PUT update social link (Protected)
export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;
        const body = await request.json();

        const social = await prisma.socialLink.update({
            where: { id },
            data: {
                name: body.name,
                url: body.url,
                icon: body.icon || null,
            },
        });

        return NextResponse.json(social);
    } catch (error) {
        console.error('Error updating social link:', error);
        return NextResponse.json({ error: 'Failed to update social link' }, { status: 500 });
    }
}

// DELETE social link (Protected)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { id } = params;

        await prisma.socialLink.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Social link deleted' });
    } catch (error) {
        console.error('Error deleting social link:', error);
        return NextResponse.json({ error: 'Failed to delete social link' }, { status: 500 });
    }
}
