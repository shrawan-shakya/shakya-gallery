import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'article',
    title: 'Journal Article',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: 'alt',
                    type: 'string',
                    title: 'Alternative Text',
                }
            ]
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
            description: 'A short summary for the card view (15-25 words).',
            validation: (rule) => rule.max(200),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'array',
            of: [
                {
                    type: 'block',
                    styles: [
                        { title: 'Normal', value: 'normal' },
                        { title: 'H2', value: 'h2' },
                        { title: 'H3', value: 'h3' },
                        { title: 'Quote', value: 'blockquote' },
                    ],
                    marks: {
                        decorators: [
                            { title: 'Strong', value: 'strong' },
                            { title: 'Emphasis', value: 'em' },
                            { title: 'Underline', value: 'underline' },
                        ],
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'URL',
                                fields: [
                                    {
                                        title: 'URL',
                                        name: 'href',
                                        type: 'url',
                                        validation: (Rule) => Rule.uri({
                                            scheme: ['http', 'https', 'mailto', 'tel']
                                        })
                                    }
                                ]
                            }
                        ]
                    }
                },
                { type: 'image' }
            ],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Collecting Guide', value: 'guide' },
                    { title: 'Artist Spotlight', value: 'artist' },
                    { title: 'Market Insights', value: 'market' },
                    { title: 'Exhibitions', value: 'news' },
                ]
            }
        }),
    ],
    preview: {
        select: {
            title: 'title',
            author: 'category',
            media: 'mainImage',
        },
        prepare(selection) {
            const { author } = selection
            return { ...selection, subtitle: author && `Category: ${author}` }
        },
    },
})
