import { defineField, defineType } from "sanity";
import { CreditCard } from "lucide-react";

export const order = defineType({
    name: "order",
    title: "Orders / Invoices",
    type: "document",
    icon: CreditCard,
    fields: [
        defineField({
            name: "orderNumber",
            title: "Order Number",
            type: "string",
            description: "Auto-generated or custom order ID (e.g., ORD-2026-001)",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "status",
            title: "Order Status",
            type: "string",
            options: {
                list: [
                    { title: "Pending Review (Draft)", value: "pending_review" },
                    { title: "Awaiting Payment (Invoice Sent)", value: "awaiting_payment" },
                    { title: "Payment Processing (Client Sent Funds)", value: "payment_processing" },
                    { title: "Paid & Shipped (Complete)", value: "paid_shipped" },
                    { title: "Cancelled", value: "cancelled" },
                ],
                layout: "radio",
            },
            initialValue: "pending_review",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "customerName",
            title: "Customer Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "customerEmail",
            title: "Customer Email",
            type: "string",
            validation: (rule) => rule.required().email(),
        }),
        defineField({
            name: "customerPhone",
            title: "Customer Phone",
            type: "string",
        }),
        defineField({
            name: "shippingAddress",
            title: "Shipping Address",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "artworks",
            title: "Purchased Artworks",
            type: "array",
            of: [{ type: "reference", to: [{ type: "artwork" }] }],
            validation: (rule) => rule.required().min(1),
        }),
        defineField({
            name: "currency",
            title: "Currency",
            type: "string",
            options: {
                list: [
                    { title: "USD ($)", value: "USD" },
                    { title: "EUR (€)", value: "EUR" },
                    { title: "GBP (£)", value: "GBP" },
                    { title: "AUD ($)", value: "AUD" },
                ],
            },
            initialValue: "USD",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "subtotal",
            title: "Artwork Subtotal",
            type: "number",
            description: "Sum of artwork prices in the selected currency",
        }),
        defineField({
            name: "shippingCost",
            title: "Custom Shipping Cost",
            type: "number",
            description: "Calculated crate/freight cost",
        }),
        defineField({
            name: "total",
            title: "Grand Total",
            type: "number",
            description: "Subtotal + Shipping",
        }),
        defineField({
            name: "notes",
            title: "Internal Notes",
            type: "text",
            rows: 3,
        }),
    ],
    preview: {
        select: {
            title: "orderNumber",
            subtitle: "customerName",
            status: "status",
            media: "artworks.0.mainImage", // Show the first artwork's image
        },
        prepare(selection) {
            const { title, subtitle, status, media } = selection;

            const statusMap: Record<string, string> = {
                pending_review: "🟡 Draft",
                awaiting_payment: "🔵 Invoiced",
                payment_processing: "🟠 Processing",
                paid_shipped: "🟢 Complete",
                cancelled: "🔴 Cancelled",
            };

            return {
                title: title || "New Order",
                subtitle: `${subtitle} - ${statusMap[status] || status}`,
                media,
            };
        },
    },
});
