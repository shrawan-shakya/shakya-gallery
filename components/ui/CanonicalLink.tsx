"use client";

import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";

export function CanonicalLink() {
  const pathname = usePathname();
  const url = `${siteConfig.url}${pathname === "/" ? "" : pathname}`;
  return <link rel="canonical" href={url} />;
}
