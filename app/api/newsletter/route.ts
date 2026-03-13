import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "next-sanity";
import { NewsletterWelcomeEmail } from "@/components/emails/NewsletterWelcomeEmail";
import { z } from "zod";
import { projectId, dataset } from "@/sanity/env";

// 1. ZOD VALIDATION
const NewsletterSchema = z.object({
  email: z.string().email("Please provide a valid email address."),
});

// 2. SANITY ADMIN CLIENT (Requires Token)
const adminClient = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Critical: Need this for mutations
});

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validation
    const result = NewsletterSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address.",
        },
        { status: 400 },
      );
    }

    const { email } = result.data;

    if (!process.env.SANITY_API_TOKEN) {
      console.error("Newsletter Error: Missing SANITY_API_TOKEN");
    }

    // 3. CHECK FOR DUPLICATE
    const existing = await adminClient.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email },
    );

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "You are already a member of the Circle.",
      });
    }

    // 4. CREATE SUBSCRIBER IN SANITY
    try {
      await adminClient.create({
        _type: "subscriber",
        email,
        subscribedAt: new Date().toISOString(),
        optInStatus: true,
        source: "Website Footer",
      });
    } catch (sanityError) {
      console.error("Newsletter Sanity Error:", sanityError);
      // We continue even if Sanity fails, so we can at least try to send the email
      // OR we can fail here. Let's fail for data integrity.
      return NextResponse.json(
        { success: false, message: "Database error. Please try again later." },
        { status: 500 },
      );
    }

    // 5. SEND WELCOME EMAIL VIA RESEND
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      // To User: Welcome
      const { error: userEmailError } = await resend.emails.send({
        from: "Shakya Gallery <concierge@shakyagallery.com>",
        to: [email],
        subject: "Welcome to the Collector's Circle",
        react: NewsletterWelcomeEmail(),
      });

      if (userEmailError) {
        console.error("Newsletter Resend (User) Error:", userEmailError);
      }

      // To Admin: Notification
      const { error: adminEmailError } = await resend.emails.send({
        from: "Shakya Gallery System <system@shakyagallery.com>",
        to: ["mag.boudha@gmail.com"],
        subject: `New Collector Joined: ${email}`,
        text: `A new collector has joined the circle: ${email}\nSource: Website Footer\nTimestamp: ${new Date().toLocaleString()}`,
      });

      if (adminEmailError) {
        console.error("Newsletter Resend (Admin) Error:", adminEmailError);
      }
    } else {
      console.error("Newsletter Error: Missing RESEND_API_KEY");
    }

    return NextResponse.json({
      success: true,
      message: "Welcome to the Collector's Circle.",
    });
  } catch (error) {
    console.error("Newsletter API General Error:", error);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again soon." },
      { status: 500 },
    );
  }
}
