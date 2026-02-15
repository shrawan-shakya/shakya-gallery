import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Shakya Gallery',
        short_name: 'Shakya',
        description: 'Premier Art Gallery in Nepal specializing in traditional Paubha and contemporary masterpieces.',
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
