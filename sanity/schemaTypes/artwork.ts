import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork', // This is what shows up in the Studio
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
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'artist',
      title: 'Artist / Origin',
      type: 'string',
      initialValue: 'Unknown Master',
    }),
        defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      placeholder: 'e.g. 36 x 48 IN',
    }),
    defineField({
      name: 'year',
      title: 'Year / Period',
      type: 'string',
    }),
    defineField({
      name: 'material',
      title: 'Material',
      type: 'string',
      placeholder: 'e.g. Gilded Bronze, Thangka on Silk',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true, // Allows you to crop images in the dashboard
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'The Story',
      type: 'text', // Simple text for now
      rows: 4,
    }),

  ],
})