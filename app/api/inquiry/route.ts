
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { InquiryEmail } from '@/components/emails/InquiryEmail';
import { ConfirmationEmail } from '@/components/emails/ConfirmationEmail';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

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

        // Extract Text Fields
        // The "Artwork Details" field contains Title, SKU, Status, URL in a text block. We can parse it or just send it as is.
        // For the email subject, let's try to extract the title if possible, or fallback.
        const detailsBlock = formData.get("Artwork Details") as string || "";
        const titleMatch = detailsBlock.match(/Title: (.*)/);
        const artworkTitle = titleMatch ? titleMatch[1] : "Artwork";

        const urlMatch = detailsBlock.match(/URL: (.*)/);
        const artworkUrl = urlMatch ? urlMatch[1] : "#";

        const name = formData.get("Name") as string;
        const email = formData.get("Email") as string;
        const mobile = formData.get("Mobile") as string;
        const shipping = formData.get("Shipping Address") as string;

        // "Message" might not be explicit in the form, but "Artwork Details" serves as the core info.
        // We can also check if there's a "subject" field from the form logic.
        const formSubject = formData.get("subject") as string;

        // Handle File Attachment
        // Resend attachment format: { filename: string, content: Buffer }
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

        // 1. Send Admin Notification (To Gallery)
        // TODO: Replace 'shrawanshakya@gmail.com' with the actual gallery email env var or keeping it hardcoded for now as per user request.
        const { error: adminError } = await resend.emails.send({
            from: 'Shakya Gallery <onboarding@resend.dev>', // Update this after verifying domain
            to: ['shrawanshakya@gmail.com'],
            subject: `New Inquiry: ${artworkTitle} (${name})`,
            react: InquiryEmail({
                artworkTitle,
                artworkUrl,
                inquirerName: name,
                inquirerEmail: email,
                inquirerMobile: mobile,
                shippingAddress: shipping,
                message: detailsBlock,
                imageUrl: undefined // We could parse this if we sent it, but the link is in the details
            }),
            attachments: attachments,
            replyTo: email, // Allow reply directly to user
        });

        if (adminError) {
            console.error('Resend Admin Error:', adminError);
            return NextResponse.json(
                { success: false, message: 'Failed to send inquiry to admin' },
                { status: 500 }
            );
        }

        // 2. Send User Confirmation (Auto-Response)
        const { error: userError } = await resend.emails.send({
            from: 'Shakya Gallery <onboarding@resend.dev>', // Update this after verifying domain
            to: [email],
            subject: `We received your inquiry: ${artworkTitle}`,
            react: ConfirmationEmail({
                inquirerName: name,
                artworkTitle,
            }),
        });

        if (userError) {
            console.error('Resend User Error:', userError);
            // We don't fail the request if auto-reply fails, as the admin notification is more critical.
        }

        return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });

    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
