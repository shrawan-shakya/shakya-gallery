import { siteConfig } from "./config";

export async function pingIndexNow(urls: string[]) {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.error("IndexNow: Missing INDEXNOW_KEY in environment variables.");
    return;
  }

  const host = siteConfig.url.replace(/^https?:\/\//, "");
  const payload = {
    host,
    key,
    keyLocation: `${siteConfig.url}/${key}.txt`,
    urlList: urls,
  };

  try {
    const response = await fetch("https://www.bing.com/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`IndexNow: Successfully pinged ${urls.length} URLs.`);
    } else {
      const error = await response.text();
      console.error(
        `IndexNow: Failed to ping URLs. Status: ${response.status}, Error: ${error}`,
      );
    }
  } catch (error) {
    console.error("IndexNow: Network error during ping.", error);
  }
}
