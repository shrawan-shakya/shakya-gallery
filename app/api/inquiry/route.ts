
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { InquiryEmail } from '@/components/emails/InquiryEmail';
import { ConfirmationEmail } from '@/components/emails/ConfirmationEmail';
import { z } from 'zod';

// Define Validation Schema
const InquirySchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().min(5, "Mobile number is too short"),
    _honey: z.string().nullable().optional(), // Allow null specifically
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Extract Fields for Validation
        // Using || undefined to turn 'null' from FormData into undefined for Zod if needed,
        // but schema now allows null.
        const rawData = {
            name: (formData.get("Name") as string) || "",
            email: (formData.get("Email") as string) || "",
            mobile: (formData.get("Mobile") as string) || "",
            _honey: formData.get("_honey") as string | null,
        };

        // 1. SPAM CHECK (Honeypot)
        if (rawData._honey) {
            console.log("Spam detected (honeypot filled). Rejecting silently.");
            return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
        }

        // 2. INPUT VALIDATION
        const result = InquirySchema.safeParse(rawData);
        if (!result.success) {
            console.error('Validation Failed:', result.error.format()); // LOG THE ERROR
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid input',
                    errors: result.error.flatten().fieldErrors
                },
                { status: 400 }
            );
        }

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

        // ... (Existing logic for extracting other fields like Artwork Details) ...
        const detailsBlock = formData.get("Artwork Details") as string || "";
        const titleMatch = detailsBlock.match(/Title: (.*)/);
        const artworkTitle = titleMatch ? titleMatch[1] : "Artwork";
        const urlMatch = detailsBlock.match(/URL: (.*)/);
        const artworkUrl = urlMatch ? urlMatch[1] : "#";
        const shipping = formData.get("Shipping Address") as string;

        // Handle File Attachment
        const file = formData.get("Virtual Preview") as File | null;
        let attachments: any[] = [];
        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            attachments.push({
                filename: file.name,
                content: buffer,
            });
        }

        // 3. Send Emails
        const { error: adminError } = await resend.emails.send({
            from: 'Shakya Gallery <concierge@shakyagallery.com>',
            to: ['mag.boudha@gmail.com'],
            subject: `New Inquiry: ${artworkTitle} (${rawData.name})`,
            react: InquiryEmail({
                artworkTitle,
                artworkUrl,
                inquirerName: rawData.name,
                inquirerEmail: rawData.email,
                inquirerMobile: rawData.mobile,
                shippingAddress: shipping,
                message: detailsBlock,
                imageUrl: undefined
            }),
            attachments: attachments,
            replyTo: rawData.email,
        });

        if (adminError) {
            console.error('Resend Admin Error:', adminError);
            return NextResponse.json({ success: false, message: 'Failed to send' }, { status: 500 });
        }

        // User Confirmation
        await resend.emails.send({
            from: 'Shakya Gallery <concierge@shakyagallery.com>',
            to: [rawData.email],
            subject: `We received your inquiry: ${artworkTitle}`,
            react: ConfirmationEmail({
                inquirerName: rawData.name,
                artworkTitle,
            }),
        });

        return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
