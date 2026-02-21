/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

// The secret word to unlock the studio
const UNLOCK_KEY = process.env.STUDIO_UNLOCK_KEY || "shakyagallerystudio";

export const dynamic = 'force-dynamic'

// Ensure search engines never index the studio
export const metadata: Metadata = {
  title: 'Admin Studio | SHAKYA',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  }
}

export default async function StudioPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const sParams = await searchParams;
  const cookieStore = await cookies();

  const hasAccessCookie = cookieStore.get('SHAKYA_STUDIO_ACCESS')?.value === 'true';
  const isUnlocking = sParams.unlock === UNLOCK_KEY;

  // If no cookie and no secret key, return 404
  if (!hasAccessCookie && !isUnlocking) {
    return notFound();
  }

  return (
    <>
      {/* If unlocking, we inject a small script to set the long-term cookie */}
      {isUnlocking && (
        <script
          dangerouslySetInnerHTML={{
            __html: `document.cookie = "SHAKYA_STUDIO_ACCESS=true; path=/; max-age=31536000; SameSite=Lax";`
          }}
        />
      )}
      <NextStudio config={config} />
    </>
  );
}
