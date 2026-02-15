import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | SHAKYA Gallery",
    description: "Privacy Policy for Shakya Gallery. Learn how we collect, use, and protect your data.",
};

export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
            <h1 className="font-serif text-4xl md:text-5xl italic font-bold text-[#1A1A1A] mb-12 text-center">
                Privacy Policy
            </h1>

            <div className="prose prose-stone max-w-none font-sans text-gray-600 leading-relaxed">
                <p className="mb-8">
                    Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <p className="mb-8">
                    Welcome to Shakya Gallery ("we," "our," or "us"). We are committed to protecting your privacy and ensuring your personal information is handled with care. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
                </p>

                <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-6 font-semibold">1. Information We Collect</h2>
                <p className="mb-4">
                    We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li><strong>Personal Information:</strong> When you inquire about an artwork or contact us, we may collect your name, email address, phone number, and message content.</li>
                    <li><strong>Usage Data:</strong> We may collect generic information about how you interact with our website, such as pages visited, time spent, and browser type.</li>
                </ul>

                <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-6 font-semibold">2. How We Use Your Information</h2>
                <p className="mb-4">
                    We use your information solely for the following purposes:
                </p>
                <ul className="list-disc pl-6 mb-8 space-y-2">
                    <li>To respond to your inquiries regarding artwork availability and pricing.</li>
                    <li>To improve our website functionality and user experience.</li>
                    <li>To send you updates or newsletters if you have explicitly opted in.</li>
                </ul>

                <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-6 font-semibold">3. Third-Party Services</h2>
                <p className="mb-8">
                    We use trusted third-party services to operate our website. Specifically, we use <strong>Sanity.io</strong> as our content management system. Your data may be processed by these providers strictly for the purpose of delivering our services. We do not sell or trade your personal information to outside parties.
                </p>

                <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-6 font-semibold">4. Cookies</h2>
                <p className="mb-8">
                    Our website may use essential cookies to ensure basic functionality. We do not use intrusive tracking cookies for advertising purposes without your consent.
                </p>

                <h2 className="font-serif text-2xl text-[#1A1A1A] mt-12 mb-6 font-semibold">5. Contact Us</h2>
                <p className="mb-8">
                    If you have any questions about this Privacy Policy, please contact us via our contact page or email us directly.
                </p>
            </div>
        </div>
    );
}
