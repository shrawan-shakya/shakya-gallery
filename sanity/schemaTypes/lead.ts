import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'lead',
    title: 'Gallery Leads',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Full Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email Address',
            type: 'string',
            description: 'Optional, if they provide it during scan.',
        }),
        defineField({
            name: 'scannedArtwork',
            title: 'Scanned Artwork',
            type: 'reference',
            to: [{ type: 'artwork' }],
            description: 'The artwork they scanned the QR code for.',
        }),
        defineField({
            name: 'hotelLocation',
            title: 'Hotel / Exhibition Location',
            type: 'string',
            description: 'The location of the artwork at the time of the scan.',
        }),
        defineField({
            name: 'actionTaken',
            title: 'Action Taken',
            type: 'string',
            options: {
                list: [
                    { title: 'WhatsApp', value: 'whatsapp' },
                    { title: 'Website Details', value: 'website' },
                ],
            },
        }),
        defineField({
            name: 'capturedAt',
            title: 'Captured At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'actionTaken',
            date: 'capturedAt',
            artwork: 'scannedArtwork.title',
        },
        prepare(selection) {
            const { title, subtitle, date, artwork } = selection
            return {
                title: `${title} (${subtitle || 'Unknown'})`,
                subtitle: `${artwork || 'No Artwork'} - ${new Date(date).toLocaleDateString()}`,
            }
        }
    }
})
