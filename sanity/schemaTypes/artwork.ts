import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
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
      name: 'status',
      title: 'Availability Status',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Sold', value: 'sold' },
          { title: 'Private Collection', value: 'private' },
        ],
        layout: 'radio', // Shows as radio buttons instead of dropdown
      },
      initialValue: 'available',
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
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessiblity.',
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'The Story',
      type: 'text',
      rows: 4,
    }),
  ],
})