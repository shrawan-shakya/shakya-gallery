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
      of: [{ type: 'reference', to: { type: 'category' } }],
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
      name: 'sku',
      title: 'SKU (Internal ID)',
      type: 'string',
      description: 'Internal Stock Keeping Unit. This will NOT be visible on the website.',
      validation: (Rule) => Rule.required().error('Every artwork needs a SKU.'),
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Internal price or display price if shown.',
    }),
    defineField({
      name: 'showPrice',
      title: 'Show Price on Website',
      type: 'boolean',
      initialValue: false,
      description: 'If toggled ON, the price will be visible to customers. If OFF, "Price on Request" will be implied.',
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

    // --- 5. LOGISTICS ---
    defineField({
      name: 'packagedWeight',
      title: 'Packaged Weight (KG)',
      type: 'number',
      description: 'Weight of the artwork including the tube/packaging.',
    }),
    defineField({
      name: 'shippingDimensions',
      title: 'Shipping Dimensions (Inches)',
      type: 'object',
      description: 'Dimensions of the shipping container.',
      fields: [
        { name: 'length', title: 'Length', type: 'number' },
        { name: 'width', title: 'Width', type: 'number' },
        { name: 'height', title: 'Height', type: 'number' },
      ],
    }),
    defineField({
      name: 'orientation',
      title: 'Orientation Override',
      type: 'string',
      description: 'Force the layout to treat this as Landscape (width-bound) or Portrait (height-bound). Leave empty for auto-detection.',
      options: {
        list: [
          { title: 'Landscape', value: 'landscape' },
          { title: 'Portrait', value: 'portrait' },
          { title: 'Square', value: 'square' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'landscape',
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
      name: 'relatedImages',
      title: 'Gallery Images',
      type: 'array',
      description: 'Add extra angles, close-ups, or in-situ shots.',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
            }
          ]
        }
      ],
    }),
    defineField({
      name: 'description',
      title: 'The Story',
      type: 'text',
      rows: 4,
    }),
  ],
})