export const siteConfig = {
    name: "Shakya Gallery",
    url: "https://shakyagallery.com",
    ogImage: "https://shakyagallery.com/og.jpg",
    description: "Exclusive Fine Arts Gallery in Nepal specializing in abstract, landscape, and portrait paintings.",
    since: "1998",
    links: {
        instagram: "https://instagram.com/shakyagallery",
        linkedin: "https://linkedin.com/company/shakyagallery",
    },
    contact: {
        email: "concierge@shakyagallery.com",
        secondaryEmail: "mag.boudha@gmail.com",
        phone: "+977-9801234567",
        address: {
            street: "Boudha",
            city: "Kathmandu",
            region: "Bagmati",
            postalCode: "44600",
            country: "NP",
            full: "Kathmandu, Nepal",
        },
        geo: {
            latitude: "27.7215",
            longitude: "85.3620",
        },
    },
    faqs: [
        {
            question: "How do I pay for an artwork?",
            answer: "We facilitate secure transactions for all clients. International collectors can pay via Bank Wire Transfer (SWIFT) or International Credit Card (upon request). For local clients in Nepal, we accept Bank Transfer, Digital Wallets (Fonepay/eSewa), or Cash on Delivery.",
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we specialize in global logistics. For international orders, we provide custom crating, export documentation, and insured shipping via DHL/FedEx. For local clients in Kathmandu, we offer complimentary hand-delivery or gallery pickup.",
        },
        {
            question: "Can I see the artwork before buying?",
            answer: "Absolutely. For local clients, we invite you to a private viewing at our Kathmandu gallery. For international collectors, we offer high-resolution detail shots and a 'Virtual Preview' service—just send us a photo of your wall, and we will digitally place the artwork for you.",
        },
        {
            question: "Is every artwork an original piece?",
            answer: "Yes, Shakya Gallery exclusively represents original fine art. Whether it is an expressive abstract or a detailed Paubha, every piece is a unique creation by a master artist, accompanied by a signed Certificate of Authenticity.",
        },
        {
            question: "How do you support Nepalese artists?",
            answer: "Since 1998, our mission has been to provide a global platform for local talent. By acquiring art through SHAKYA, you are directly supporting the livelihoods of traditional and contemporary artists in Nepal, helping to preserve our rich cultural heritage.",
        },
    ],
    benefits: [
        {
            title: "Certified Authenticity",
            description: "Every artwork is accompanied by a signed Certificate of Authenticity, verifying its origin and the artist's legacy.",
        },
        {
            title: "Worldwide & Local Access",
            description: "We provide secure international crating and shipping for global collectors, and complimentary delivery within the Kathmandu Valley.",
        },
        {
            title: "Support Local Artists",
            description: "Your acquisition directly supports the livelihood of master artists in Kathmandu and the preservation of Himalayan heritage.",
        },
        {
            title: "Secure Invoicing",
            description: "We facilitate secure international Bank Transfers (SWIFT) and local digital payments, ensuring transparency for every acquisition.",
        },
    ],
    currency: {
        usdToNpr: 135, // Approximate exchange rate
        options: ["USD", "NPR"] as const
    }
};

export type SiteConfig = typeof siteConfig;
