const fs = require("fs");
const path = require("path");

// Parse .env.local
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envStr = fs.readFileSync(envPath, "utf8");
  envStr.split("\n").forEach((line) => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  });
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

async function uploadLogo() {
  const filePath = path.join(__dirname, "../public/shakya-logo.svg");
  console.log(`Uploading logo from ${filePath}...`);

  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return;
  }

  const fileContent = fs.readFileSync(filePath);

  const url = `https://${projectId}.api.sanity.io/v2024-03-01/assets/images/${dataset}?filename=shakya-logo.svg`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "image/svg+xml",
        Authorization: `Bearer ${token}`,
      },
      body: fileContent,
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Upload failed (${response.status}): ${err}`);
    }

    const data = await response.json();
    console.log("Logo uploaded successfully! Asset ID:", data.document._id);
    console.log("URL:", data.document.url);
  } catch (error) {
    console.error("Error uploading logo:", error.message);
  }
}

uploadLogo();
