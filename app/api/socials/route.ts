import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

// GET all social links (Public)
export async function GET() {
    try {
        const socials = await prisma.socialLink.findMany();
        return NextResponse.json(socials);
    } catch (error) {
        console.error('Error fetching socials:', error);
        return NextResponse.json({ error: 'Failed to fetch socials' }, { status: 500 });
    }
}

// POST create social link (Protected)
export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const social = await prisma.socialLink.create({
            data: {
                name: body.name,
                url: body.url,
                icon: body.icon || null,
            },
        });

        return NextResponse.json(social, { status: 201 });
    } catch (error) {
        console.error('Error creating social link:', error);
        return NextResponse.json({ error: 'Failed to create social link' }, { status: 500 });
    }
}
