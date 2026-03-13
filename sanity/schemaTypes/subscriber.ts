import { defineType, defineField } from "sanity";

export default defineType({
  name: "subscriber",
  title: "Newsletter Subscribers",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "optInStatus",
      title: "Opt-in Status",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
    defineField({
      name: "source",
      title: "Signup Source",
      type: "string",
      initialValue: "Website Footer",
      options: {
        list: [
          { title: "Website Footer", value: "Website Footer" },
          { title: "Checkout Page", value: "Checkout" },
          { title: "Contact Form", value: "Contact" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "email",
      subtitle: "subscribedAt",
    },
  },
});
