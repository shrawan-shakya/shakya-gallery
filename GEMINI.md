Context: SHAKYA is a luxury fine-art digital experience. Antigravity must prioritize type-safety, performance at scale (300+ items), and architectural consistency.

1. Data & Type Safety (High Priority)
Stop Manual Typing: Do not manually define Artwork or Category interfaces in components. Use sanity-typegen or a central @/types/sanity.d.ts file. If a new field is added in Sanity, Antigravity must update the schema and the type simultaneously.

Sanity Singleton: Always use @/sanity/lib/client.ts. Do not initialize new clients in page files.

Live Content: Maintain the SanityLive strategy in layout.tsx. Any new dynamic route must be compatible with defineLive.

2. Scalable Performance (The "300+ Art Piece" Rule)
Server-Side Filtering: Transition from useState to URL Search Params for filtering in CollectionClient.tsx. This allows users to share a link to a specific filtered collection (e.g., shakyagallery.com/collection?artist=paubha).

Image Optimization: Every instance of next/image must now include the blurDataURL provided by Sanity’s asset metadata. Create a SanityImage.tsx utility that wraps MuseumFrame to automate this.

3. Design System & Animations
Global Motion: Stop defining framer-motion variants inline. All luxury transitions (fade-ins, staggered grids) must be imported from @/lib/motion-variants.ts.

Luxury Constraint: Animations must use duration: 0.6 and ease: [0.22, 1, 0.36, 1] (Quart out) to maintain a high-end gallery feel.

4. Component Architecture
Clean Clients: CollectionClient.tsx and GalleryGridClient.tsx are getting bloated. Logic for "Filtering" must be moved to a custom hook useArtFilter.ts.

Error Boundaries: Every sanityFetch call must be wrapped in a Suspense boundary with a skeleton loader that matches the MuseumFrame aspect ratio.