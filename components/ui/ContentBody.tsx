import { PortableText, PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const hasAsset =
        value?.asset?._ref || value?.asset?._id || value?.asset?.url;
      const lqip = value?.asset?.metadata?.lqip;
      const src =
        value?.asset?.url || (hasAsset ? urlForImage(value).url() : "");

      return (
        <div className="relative w-full aspect-[16/9] my-8 rounded-sm overflow-hidden bg-gray-100">
          {hasAsset && (
            <Image
              src={src}
              alt={value.alt || "Article Image"}
              fill
              className="object-cover"
              placeholder={lqip ? "blur" : "empty"}
              blurDataURL={lqip}
            />
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl text-soft-black mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl text-soft-black mt-8 mb-4">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="font-sans text-base leading-relaxed text-gray-700 mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-soft-black pl-6 my-8 italic font-serif text-xl text-gray-600">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-6 font-sans text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 font-sans text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const href = value?.href;

      if (!href) {
        return (
          <span className="underline decoration-black/20">{children}</span>
        );
      }

      const rel = !href.startsWith("/") ? "noopener noreferrer" : undefined;
      const target = !href.startsWith("/") ? "_blank" : undefined;

      if (href.startsWith("/")) {
        return (
          <Link
            href={href}
            className="text-soft-black underline decoration-black/20 hover:decoration-black transition-all"
          >
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          rel={rel}
          target={target}
          className="text-soft-black underline decoration-black/20 hover:decoration-black transition-all"
        >
          {children}
        </a>
      );
    },
  },
};

export const ContentBody = ({ content }: { content: any }) => {
  return (
    <div className="max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
};
