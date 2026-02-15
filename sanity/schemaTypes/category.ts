import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
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
      name: 'type',
      title: 'Category Type',
      type: 'string',
      description: 'Is this a Style (e.g. Abstract), a Subject (e.g. Buddha), or a Medium?',
      options: {
        list: [
          { title: 'Art Style', value: 'style' }, // e.g. Abstract, Realism
          { title: 'Subject', value: 'subject' }, // e.g. Mountain, Portrait, Deity
          { title: 'Medium', value: 'medium' },   // e.g. Oil, Acrylic (if you want to filter by it)
          { title: 'Collection', value: 'collection' }, // e.g. Summer Sale, Curator Picks
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional text for SEO pages (e.g. "Browse our collection of Fine Art paintings...")',
    }),
  ],
})