import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing required environment variables.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-24", // Use today's or recent date
  useCdn: false,
  token,
});

async function run() {
  console.log("Fetching artworks where 'artist' is a string...");

  // Fetch artworks where 'artist' is defined
  const allArtworks = await client.fetch(`*[_type == "artwork" && defined(artist)]{_id, title, artist}`);
  
  // Filter for string type in JavaScript to avoid GROQ type() issues
  const artworks = allArtworks.filter(a => typeof a.artist === "string");
  
  if (artworks.length === 0) {
    console.log("No artworks found requiring migration.");
    return;
  }

  console.log(`Found ${artworks.length} artworks to migrate.`);

  // To limit memory/concurrency issues, we do this sequentially
  for (const artwork of artworks) {
    const artistName = artwork.artist;
    console.log(`\nProcessing artwork: ${artwork.title} (ID: ${artwork._id})`);
    console.log(`-> String artist field: "${artistName}"`);

    if (!artistName || artistName.trim() === "") {
        console.log("-> Artist name is empty, unsetting the field.");
        await client
          .patch(artwork._id)
          .unset(["artist"])
          .commit();
        continue;
    }

    // Attempt to find the artist document
    let artistDoc = await client.fetch(`*[_type == "artist" && name match $name][0]`, { name: artistName });

    if (!artistDoc) {
      console.log(`-> Artist document for '${artistName}' not found. Creating a new one...`);
      
      const slug = artistName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      artistDoc = await client.create({
        _type: "artist",
        name: artistName,
        slug: { _type: "slug", current: slug }
      });
      console.log(`-> Created artist document (ID: ${artistDoc._id})`);
    } else {
      console.log(`-> Found existing artist document: ${artistDoc.name} (ID: ${artistDoc._id})`);
    }

    // Set the artist field as a reference
    console.log(`-> Updating artwork to reference artist document...`);
    await client
      .patch(artwork._id)
      .set({
        artist: {
          _type: "reference",
          _ref: artistDoc._id
        }
      })
      .commit();
    console.log(`-> Artwork updated successfully.`);
  }

  console.log("\nMigration completed successfully.");
}

run().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
