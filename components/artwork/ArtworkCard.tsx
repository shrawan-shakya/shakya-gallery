"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MuseumPlaque } from "@/components/ui/MuseumPlaque";
import { SanityImage } from "@/components/ui/SanityImage";
import { LazyGridItem } from "@/components/ui/LazyGridItem";
import { PriceOnRequest } from "@/components/ui/PriceOnRequest";
import { cn } from "@/lib/utils";
import { Price } from "@/components/ui/Price";
import { Artwork } from "@/lib/types";
import { staggerItem } from "@/lib/motion-variants";
import { Badge } from "@/components/ui/Badge";

interface ArtworkCardProps {
  art: Artwork;
  globalIndex: number;
  showMat: boolean;
  layout?: "grid" | "single";
}

export function ArtworkCard({
  art,
  globalIndex,
  showMat,
  layout = "grid",
}: ArtworkCardProps) {
  const isPriority = globalIndex < 4;

  if (layout === "single") {
    return (
      <LazyGridItem
        rootMargin="1000px 0px"
        aspectRatio={art.aspectRatio}
        disabled={isPriority}
      >
        <motion.div
          variants={staggerItem}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "600px" }}
          className="w-full relative z-10"
          style={{ willChange: "transform, opacity" }}
        >
          <Link
            href={`/artwork/${art.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block cursor-pointer no-underline group/card"
          >
            <div className="w-full mx-auto flex flex-col items-center">
              <div
                className="w-full relative group/image"
                style={{
                  maxWidth:
                    art.aspectRatio > 1.1
                      ? `min(1200px, 100%, calc(70vh * ${art.aspectRatio}))`
                      : `min(1000px, 100%, calc(85vh * ${Math.max(art.aspectRatio || 1, 0.4)}))`,
                }}
              >
                <SanityImage
                  source={art.image}
                  alt={`Buy ${art.title} - Original Nepali fine art at Shakya Gallery`}
                  lqip={art.lqip}
                  aspectRatio={art.aspectRatio}
                  hasMat={showMat}
                  priority={isPriority}
                  imageClassName={cn(
                    art.status === "sold" || art.status === "private"
                      ? "grayscale-[0.2] group-hover/image:grayscale group-hover/image:opacity-40"
                      : "grayscale-[0.2] group-hover/image:grayscale-0",
                  )}
                />
                {/* STATUS BADGES */}
                <div className="absolute inset-x-0 bottom-0 pointer-events-none p-4 md:p-6 bg-gradient-to-t from-black/40 via-black/10 to-transparent md:bg-none">
                  {art.status === "sold" && (
                    <>
                      <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                        <Badge variant="danger" size="default">SOLD</Badge>
                      </div>
                      <div className="md:hidden flex items-center justify-between w-full px-2">
                        <Badge variant="danger" size="sm">SOLD</Badge>
                      </div>
                    </>
                  )}
                  {art.status === "available" && (
                    <>
                      <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                        <span className="bg-white/95 text-soft-black text-sm md:text-base font-sans tracking-luxury-wide px-6 py-3 backdrop-blur-md shadow-md border border-soft-black/10 whitespace-nowrap">
                          {art.showPrice && art.price ? (
                            <Price amount={art.price} />
                          ) : (
                            <PriceOnRequest
                              startingPrice={art.startingPrice}
                              variant="badge"
                            />
                          )}
                        </span>
                      </div>
                      <div className="md:hidden flex justify-center w-full">
                        <span className="flex items-center justify-center bg-white/90 text-soft-black text-tiny font-sans leading-none tracking-luxury-tight px-3 py-1 min-h-[24px] backdrop-blur-sm shadow-sm border border-soft-black/5 whitespace-nowrap">
                          {art.showPrice && art.price ? (
                            <Price amount={art.price} />
                          ) : (
                            <PriceOnRequest
                              startingPrice={art.startingPrice}
                              variant="minimal"
                              className="gap-1"
                            />
                          )}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div
                className="w-full mx-auto relative z-0 mt-6 md:mt-8 flex flex-col items-center text-center"
                style={{
                  maxWidth:
                    art.aspectRatio > 1.1
                      ? `min(1200px, 100%, calc(70vh * ${art.aspectRatio}))`
                      : `min(1000px, 100%, calc(85vh * ${Math.max(art.aspectRatio || 1, 0.4)}))`,
                }}
              >
                <MuseumPlaque
                  title={art.title}
                  artist={art.artist}
                  medium={art.material}
                  dimensions={art.dimensions}
                  year={art.year}
                  price={art.price}
                  showPrice={art.showPrice}
                  startingPrice={art.startingPrice}
                  showButton={false}
                  className={art.aspectRatio > 1.1 ? "md:w-[60%]" : ""}
                />
              </div>
            </div>
          </Link>
        </motion.div>
      </LazyGridItem>
    );
  }

  return (
    <LazyGridItem
      className="relative z-10 w-full"
      rootMargin="1000px 0px"
      aspectRatio={art.aspectRatio}
      disabled={isPriority}
    >
      <motion.div
        variants={staggerItem}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "600px" }}
        layout
        style={{ willChange: "transform, opacity" }}
      >
        <Link
          href={`/artwork/${art.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer group/card"
        >
          <div
            className="relative group/image mx-auto w-full"
            style={{
              maxWidth:
                layout === "grid" && art.aspectRatio > 1.1
                  ? `min(1200px, 100%, calc(70vh * ${art.aspectRatio}))`
                  : layout === "grid"
                    ? `min(1000px, 100%, calc(85vh * ${Math.max(art.aspectRatio || 1, 0.4)}))`
                    : "none",
            }}
          >
            <SanityImage
              source={art.image}
              alt={art.title}
              lqip={art.lqip}
              aspectRatio={art.aspectRatio}
              hasMat={showMat}
              priority={isPriority}
              imageClassName={cn(
                art.status === "sold" || art.status === "private"
                  ? "grayscale-[0.2] group-hover/image:grayscale group-hover/image:opacity-40"
                  : "grayscale-[0.2] group-hover/image:grayscale-0",
              )}
            />
            <div className="absolute inset-x-0 bottom-0 pointer-events-none p-2 md:p-6 bg-gradient-to-t from-black/40 via-black/10 to-transparent md:bg-none transition-opacity duration-500">
              {/* SOLD BADGE */}
              {art.status === "sold" && (
                <>
                  <div className="hidden md:flex absolute inset-0 flex-col items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                    <Badge variant="danger" size="default">SOLD</Badge>
                  </div>
                  <div className="md:hidden flex items-center justify-between w-full px-2">
                    <Badge variant="danger" size="sm">SOLD</Badge>
                  </div>
                </>
              )}

              {/* PRICE BADGE */}
              {art.status === "available" && (
                <>
                  <div className="hidden md:flex absolute inset-0 items-center justify-center opacity-0 group-hover/image:opacity-100 transition-opacity duration-500">
                    <span className="bg-white/95 text-soft-black text-base font-sans tracking-luxury-wide px-6 py-3 backdrop-blur-md shadow-md border border-soft-black/10 whitespace-nowrap">
                      {art.showPrice && art.price ? (
                        <Price amount={art.price} />
                      ) : (
                        <PriceOnRequest
                          startingPrice={art.startingPrice}
                          variant="badge"
                        />
                      )}
                    </span>
                  </div>
                  <div className="md:hidden flex justify-center w-full">
                    <span className="flex items-center justify-center bg-white/90 text-soft-black text-tiny font-sans leading-none tracking-luxury-tight px-3 py-1 min-h-[24px] backdrop-blur-sm shadow-sm border border-soft-black/5 whitespace-nowrap">
                      {art.showPrice && art.price ? (
                        <Price amount={art.price} />
                      ) : (
                        <PriceOnRequest
                          startingPrice={art.startingPrice}
                          variant="minimal"
                          className="gap-1"
                        />
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center text-center">
            <MuseumPlaque
              title={art.title}
              artist={art.artist}
              year={art.year}
              medium={art.material}
              dimensions={art.dimensions}
              price={art.price}
              showPrice={art.showPrice}
              startingPrice={art.startingPrice}
              showButton={false}
              showMedium={false}
              className={art.aspectRatio > 1.1 ? "md:w-[60%]" : ""}
            />
          </div>
        </Link>
      </motion.div>
    </LazyGridItem>
  );
}
