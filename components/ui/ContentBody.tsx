import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';
import Link from 'next/link';

const components: PortableTextComponents = {
    types: {
        image: ({ value }: any) => {
            return (
                <div className="relative w-full aspect-[16/9] my-8 rounded-sm overflow-hidden bg-gray-100">
                    {value?.asset?._ref && (
                        <Image
                            src={urlForImage(value).url()}
                            alt={value.alt || 'Article Image'}
                            fill
                            className="object-cover"
                        />
                    )}
                </div>
            );
        },
    },
    block: {
        h2: ({ children }) => <h2 className="font-serif text-3xl text-soft-black mt-12 mb-6">{children}</h2>,
        h3: ({ children }) => <h3 className="font-serif text-2xl text-soft-black mt-8 mb-4">{children}</h3>,
        normal: ({ children }) => <p className="font-sans text-base leading-relaxed text-gray-700 mb-6">{children}</p>,
        blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-soft-black pl-6 my-8 italic font-serif text-xl text-gray-600">
                {children}
            </blockquote>
        ),
    },
    list: {
        bullet: ({ children }) => <ul className="list-disc pl-6 mb-6 font-sans text-gray-700">{children}</ul>,
        number: ({ children }) => <ol className="list-decimal pl-6 mb-6 font-sans text-gray-700">{children}</ol>,
    },
    marks: {
        link: ({ children, value }: any) => {
            const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
            const target = !value.href.startsWith('/') ? '_blank' : undefined;

            if (value.href.startsWith('/')) {
                return (
                    <Link href={value.href} className="text-soft-black underline decoration-black/20 hover:decoration-black transition-all">
                        {children}
                    </Link>
                );
            }

            return (
                <a
                    href={value.href}
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
    return <div className="max-w-none"><PortableText value={content} components={components} /></div>;
};
