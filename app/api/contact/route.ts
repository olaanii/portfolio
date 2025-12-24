import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Log the message for now (would integrate with SendGrid/Resend in production)
        console.log('New Contact Message:', body);

        // Validation
        if (!body.name || !body.email || !body.message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
