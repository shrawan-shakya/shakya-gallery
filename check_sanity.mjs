import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "qeqv70yn",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function main() {
  const articles = await client.fetch(`*[_type == "article"]{ "slug": slug.current, title }`);
  console.log(JSON.stringify(articles, null, 2));
}

main().catch(console.error);
