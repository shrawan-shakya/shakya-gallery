
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        // Validate that we have the secret key in environment variables
        const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

        if (!accessKey) {
            console.error('Missing WEB3FORMS_ACCESS_KEY environment variable');
            return NextResponse.json(
                { success: false, message: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Append the protected access key
        formData.append("access_key", accessKey);

        // Forward the request to Web3Forms
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData,
        });

        const result = await response.json();

        if (result.success) {
            return NextResponse.json({ success: true, message: 'Inquiry submitted successfully' });
        } else {
            console.error('Web3Forms Error:', result);
            return NextResponse.json(
                { success: false, message: result.message || 'Submission failed' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('API Route Error:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
