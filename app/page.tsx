import { client } from "@/sanity/lib/client";
import { HeritagePreview } from "@/components/sections/HeritagePreview";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { AnimatedHero } from "@/components/sections/AnimatedHero";
import { WhyBuy } from "@/components/sections/WhyBuy";
import { FAQ } from "@/components/sections/FAQ";
import { siteConfig } from "@/lib/config";
import { SectionErrorBoundary } from "@/components/ui/SectionErrorBoundary";



import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${siteConfig.name} | Original Nepalese Fine Art & Modern Abstract Collection`,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default async function Home() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    "name": siteConfig.name,
    "image": `${siteConfig.url}/hero-1.jpg`,
    "logo": `${siteConfig.url}/icon.png`,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "telephone": siteConfig.contact.phone,
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.contact.address.street,
      "addressLocality": siteConfig.contact.address.city,
      "addressRegion": siteConfig.contact.address.region,
      "postalCode": siteConfig.contact.address.postalCode,
      "addressCountry": siteConfig.contact.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": siteConfig.contact.geo.latitude,
      "longitude": siteConfig.contact.geo.longitude
    }
  };

  return (
    <div className="bg-bone min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="h-screen w-full">
        <SectionErrorBoundary sectionName="Hero Section">
          <AnimatedHero />
        </SectionErrorBoundary>
      </section>

      <section className="min-h-screen w-full flex items-center justify-center bg-bone">
        <SectionErrorBoundary sectionName="Heritage Preview">
          <HeritagePreview />
        </SectionErrorBoundary>
      </section>

      <section className="min-h-screen w-full bg-bone pt-20">
        <SectionErrorBoundary sectionName="Gallery Preview">
          <GalleryGrid limit={6} />
        </SectionErrorBoundary>
      </section>

      <SectionErrorBoundary sectionName="Why Buy Section">
        <WhyBuy />
      </SectionErrorBoundary>

      <SectionErrorBoundary sectionName="FAQ Section">
        <FAQ />
      </SectionErrorBoundary>
    </div>
  );
}