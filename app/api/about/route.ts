import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET about info (Public)
export async function GET() {
    try {
        const about = await prisma.about.findFirst();
        return NextResponse.json(about || { bio: '', imageUrl: null });
    } catch (error) {
        console.error('Error fetching about:', error);
        return NextResponse.json({ error: 'Failed to fetch about' }, { status: 500 });
    }
}

// PUT update about (Protected) - Creates if not exists
export async function PUT(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        // Check if about exists
        const existing = await prisma.about.findFirst();

        let about;
        if (existing) {
            about = await prisma.about.update({
                where: { id: existing.id },
                data: {
                    bio: body.bio,
                    imageUrl: body.imageUrl,
                },
            });
        } else {
            about = await prisma.about.create({
                data: {
                    bio: body.bio,
                    imageUrl: body.imageUrl || null,
                },
            });
        }

        return NextResponse.json(about);
    } catch (error) {
        console.error('Error updating about:', error);
        return NextResponse.json({ error: 'Failed to update about' }, { status: 500 });
    }
}
