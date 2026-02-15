
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmail } from '@/components/emails/ContactEmail';
import { z } from 'zod';

// Validation Schema
const ContactSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    message: z.string().min(1, "Message is required"),
    interest: z.string().optional(),
    _honey: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. SPAM CHECK
        if (body._honey) {
            return NextResponse.json({ success: true, message: 'Message sent successfully' });
        }

        // 2. VALIDATION
        const result = ContactSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ success: false, message: 'Invalid Input' }, { status: 400 });
        }

        const { name, email, interest = "General Inquiry", message } = result.data;

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
