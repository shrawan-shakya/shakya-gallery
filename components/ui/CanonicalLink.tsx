"use client";

import { usePathname } from "next/navigation";

export function CanonicalLink() {
  const pathname = usePathname();
  const url = `https://shakyagallery.com${pathname === "/" ? "" : pathname}`;
  return <link rel="canonical" href={url} />;
}
