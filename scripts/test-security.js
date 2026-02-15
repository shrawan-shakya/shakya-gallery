
const BASE_URL = "http://localhost:3000";

async function testEndpoint(name, payload, expectedStatus) {
    console.log(`\n--- Testing ${name} ---`);
    try {
        const res = await fetch(`${BASE_URL}/api/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log(`Status: ${res.status} (Expected: ${expectedStatus})`);
        console.log("Response:", JSON.stringify(data, null, 2));

        if (res.status === expectedStatus) {
            console.log("✅ PASS");
        } else {
            console.log("❌ FAIL");
        }
    } catch (e) {
        console.error("❌ ERROR:", e.message);
    }
}

async function run() {
    // 1. Honeypot (Should look like success)
    await testEndpoint(
        "HONEYPOT (Spam Bot)",
        { name: "Bot", email: "bot@spam.com", message: "Spam", _honey: "I am a bot" },
        200
    );

    // 2. Invalid Input (Should be Bad Request)
    await testEndpoint(
        "INVALID INPUT",
        { name: "User", email: "not-an-email", message: "Hello" },
        400
    );

    // 3. Valid Input (Should be Success or Server Error if key missing)
    await testEndpoint(
        "VALID INPUT",
        { name: "Security Tester", email: "test@example.com", message: "Verifying security headers" },
        200 // Or 500 if RESEND_API_KEY is missing
    );
}

run();
