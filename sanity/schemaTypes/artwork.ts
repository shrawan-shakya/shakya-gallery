import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    // --- 1. BASIC INFO ---
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
    
    // --- 2. CLASSIFICATION (The "Filter" Engine) ---
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Select Style, Subject, or Collection tags (e.g. "Abstract", "Mountain", "Summer Sale")',
      of: [{ type: 'reference', to: { type: 'category' } }], // <--- REFERENCES THE NEW SCHEMA
    }),
    
    // --- 3. DETAILS ---
    defineField({
      name: 'year',
      title: 'Year / Period',
      type: 'string',
    }),
    defineField({
      name: 'material',
      title: 'Material Text',
      type: 'string',
      description: 'Display text like "Oil on Canvas" (Use Categories for filtering)',
      placeholder: 'e.g. Gilded Bronze',
    }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      placeholder: 'e.g. 36 x 48 IN',
    }),

    // --- 4. SALES & INVENTORY ---
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Leave empty if "Price on Request"',
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
        layout: 'radio',
      },
      initialValue: 'available',
    }),
    defineField({
      name: 'onSale',
      title: 'On Sale / Highlight',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle this to mark as a special offer or featured item',
    }),

    // --- 5. MEDIA ---
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