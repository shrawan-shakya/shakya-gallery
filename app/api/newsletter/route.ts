import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from "next-sanity";
import { NewsletterWelcomeEmail } from '@/components/emails/NewsletterWelcomeEmail';
import { z } from 'zod';

// 1. ZOD VALIDATION
const NewsletterSchema = z.object({
    email: z.string().email("Please provide a valid email address."),
});

// 2. SANITY ADMIN CLIENT (Requires Token)
const adminClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: "2024-03-01",
    useCdn: false,
    token: process.env.SANITY_API_TOKEN, // Critical: Need this for mutations
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validation
        const result = NewsletterSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: "Please provide a valid email address."
            }, { status: 400 });
        }

        const { email } = result.data;

        // 3. CHECK FOR DUPLICATE
        const existing = await adminClient.fetch(
            `*[_type == "subscriber" && email == $email][0]`,
            { email }
        );

        if (existing) {
            // Silently succeed to avoid user confusion, or return custom message
            return NextResponse.json({
                success: true,
                message: "You are already a member of the Circle."
            });
        }

        // 4. CREATE SUBSCRIBER IN SANITY
        await adminClient.create({
            _type: 'subscriber',
            email,
            subscribedAt: new Date().toISOString(),
            optInStatus: true,
            source: 'Website Footer'
        });

        // 5. SEND WELCOME EMAIL VIA RESEND
        const resendApiKey = process.env.RESEND_API_KEY;
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);

            // To User: Welcome
            await resend.emails.send({
                from: 'Shakya Gallery <concierge@shakyagallery.com>',
                to: [email],
                subject: 'Welcome to the Collector\'s Circle',
                react: NewsletterWelcomeEmail(),
            });

            // To Admin: Notification
            await resend.emails.send({
                from: 'Shakya Gallery System <system@shakyagallery.com>',
                to: ['mag.boudha@gmail.com'],
                subject: `New Collector Joined: ${email}`,
                text: `A new collector has joined the circle: ${email}\nSource: Website Footer\nTimestamp: ${new Date().toLocaleString()}`,
            });
        }

        return NextResponse.json({
            success: true,
            message: 'Welcome to the Collector\'s Circle.'
        });

    } catch (error) {
        console.error('Newsletter API Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
