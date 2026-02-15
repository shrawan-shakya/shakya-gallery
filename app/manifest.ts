import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Shakya Gallery',
        short_name: 'Shakya',
        description: 'Exclusive Fine Arts Gallery in Nepal specializing in abstracts, landscapes, and portraits.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F4F1EA', // bg-bone
        theme_color: '#F4F1EA',
        icons: [
            {
                src: '/icon',
                sizes: '192x192',
                type: 'image/png',
            },
        ],
    }
}
