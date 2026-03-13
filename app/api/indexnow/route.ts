import { NextRequest, NextResponse } from "next/server";
import { pingIndexNow } from "@/lib/indexnow";
import { siteConfig } from "@/lib/config";

// This endpoint will be triggered by Sanity Webhooks
// Expected payload: { _type: 'artwork', slug: '...', operation: 'create' | 'update' }
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { _type, slug, operation } = body;

    // We only care about artworks and articles (journal entries)
    if (!["artwork", "article"].includes(_type)) {
      return NextResponse.json({ message: "Ignored type" }, { status: 200 });
    }

    if (!slug) {
      return NextResponse.json(
        { message: "No slug provided" },
        { status: 400 },
      );
    }

    const path = _type === "artwork" ? `/artwork/${slug}` : `/journal/${slug}`;
    const fullUrl = `${siteConfig.url}${path}`;

    console.log(`IndexNow: Triggering ping for ${fullUrl} (${operation})`);

    // Use a small delay or fire-and-forget to not block the webhook response
    // In a serverless environment, we should ideally wait for the promise
    await pingIndexNow([fullUrl]);

    return NextResponse.json({ success: true, url: fullUrl });
  } catch (error) {
    console.error("IndexNow Webhook Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
