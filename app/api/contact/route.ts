
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmail } from '@/components/emails/ContactEmail';

export async function POST(request: Request) {
    try {
        const { name, email, interest, message } = await request.json();

        // Retrieve Resend API Key
        const resendApiKey = process.env.RESEND_API_KEY;

        if (!resendApiKey) {
            console.error('Missing RESEND_API_KEY environment variable');
            return NextResponse.json(
                { success: false, message: 'Server configuration error' },
                { status: 500 }
            );
        }

        const resend = new Resend(resendApiKey);

        // Send Admin Notification (To Gallery)
        const { error } = await resend.emails.send({
            from: 'Shakya Gallery <concierge@shakyagallery.com>',
            to: ['mag.boudha@gmail.com'],
            subject: `New Inquiry: ${interest} (${name})`,
            react: ContactEmail({
                name,
                email,
                interest,
                message,
            }),
            replyTo: email, // Allow reply directly to user
        });

        if (error) {
            console.error('Resend Contact Error:', error);
            return NextResponse.json(
                { success: false, message: 'Failed to send message' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, message: 'Message sent successfully' });

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
