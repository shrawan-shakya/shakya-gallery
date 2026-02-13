
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Hr,
} from "@react-email/components";
import * as React from "react";

interface ConfirmationEmailProps {
    inquirerName: string;
    artworkTitle: string;
}

export const ConfirmationEmail = ({
    inquirerName,
    artworkTitle,
}: ConfirmationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>We received your inquiry for: {artworkTitle}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>SHAKYA</Heading>

                    <Section style={section}>
                        <Text style={text}>Dear {inquirerName},</Text>
                        <Text style={text}>
                            Thank you for your interest in <strong>{artworkTitle}</strong>.
                        </Text>
                        <Text style={text}>
                            We have successfully received your inquiry. Our curation team is currently reviewing your request and calculating the best shipping options to your destination.
                        </Text>
                        <Text style={text}>
                            You can expect a personalized quote and further details from a gallery advisor within <strong>24 hours</strong>.
                        </Text>
                    </Section>

                    <Hr style={hr} />

                    <Section style={section}>
                        <Text style={text}>
                            Prefer an immediate update?
                        </Text>
                        <Link href="https://wa.me/9779841234567" style={button}>
                            Chat on WhatsApp
                        </Link>
                    </Section>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Shakya Gallery<br />
                        Kathmandu, Nepal<br />
                        <Link href="https://shakyagallery.com" style={{ color: "#8898aa" }}>www.shakyagallery.com</Link>
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: "#f3f3f3",
    fontFamily: 'Georgia, serif', // More "gallery" like font
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px 20px",
    maxWidth: "600px",
    border: "1px solid #e0e0e0"
};

const section = {
    padding: "20px 0",
};

const h1 = {
    color: "#1a1a1a",
    fontSize: "32px",
    fontWeight: "normal",
    textAlign: "center" as const,
    marginBottom: "40px",
    letterSpacing: "0.1em",
};

const text = {
    color: "#333",
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "20px",
};

const button = {
    backgroundColor: "#1a1a1a",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "12px 24px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
};

const hr = {
    borderColor: "#e0e0e0",
    margin: "30px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "1.5",
    textAlign: "center" as const,
    marginTop: "20px",
    fontFamily: 'Helvetica, Arial, sans-serif', // Clean sans for footer
};

export default ConfirmationEmail;
