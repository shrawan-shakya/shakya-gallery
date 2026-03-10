import { NextResponse } from "next/server";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, scannedArtworkId, scanLocation, actionTaken } = body;

        if (!scannedArtworkId || !actionTaken) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const leadName = name?.trim() ? name : "Anonymous Scan";

        const newLead = await backendClient.create({
            _type: "lead",
            name: leadName,
            email: email || undefined,
            hotelLocation: scanLocation || undefined,
            scannedArtwork: {
                _type: "reference",
                _ref: scannedArtworkId,
            },
            actionTaken,
            capturedAt: new Date().toISOString(),
        });

        return NextResponse.json({ success: true, leadId: newLead._id });
    } catch (error) {
        console.error("Error capturing lead:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
