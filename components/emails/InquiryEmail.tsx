
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface InquiryEmailProps {
    artworkTitle: string;
    artworkUrl: string;
    inquirerName: string;
    inquirerEmail: string;
    inquirerMobile: string;
    shippingAddress: string;
    message?: string;
    imageUrl?: string;
}

export const InquiryEmail = ({
    artworkTitle,
    artworkUrl,
    inquirerName,
    inquirerEmail,
    inquirerMobile,
    shippingAddress,
    message,
    imageUrl,
}: InquiryEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>New Inquiry for {artworkTitle} from {inquirerName}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>New Artwork Inquiry</Heading>

                    <Section style={section}>
                        <Text style={text}>
                            <strong>Artwork:</strong> <Link href={artworkUrl}>{artworkTitle}</Link>
                        </Text>
                        {imageUrl && (
                            <Img src={imageUrl} alt={artworkTitle} width="100%" height="auto" style={image} />
                        )}
                    </Section>

                    <Section style={section}>
                        <Heading as="h2" style={h2}>Inquirer Details</Heading>
                        <Text style={text}><strong>Name:</strong> {inquirerName}</Text>
                        <Text style={text}><strong>Email:</strong> <Link href={`mailto:${inquirerEmail}`}>{inquirerEmail}</Link></Text>
                        <Text style={text}><strong>Mobile:</strong> {inquirerMobile}</Text>
                    </Section>

                    <Section style={section}>
                        <Heading as="h2" style={h2}>Shipping Destination</Heading>
                        <Text style={text}><pre style={pre}>{shippingAddress}</pre></Text>
                    </Section>

                    {message && (
                        <Section style={section}>
                            <Heading as="h2" style={h2}>Message/Notes</Heading>
                            <Text style={text}>{message}</Text>
                        </Section>
                    )}

                    <Text style={footer}>
                        Sent via Shakya Gallery Website
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

// Styles
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "20px 0 48px",
    marginBottom: "64px",
};

const section = {
    padding: "0 48px",
};

const h1 = {
    color: "#333",
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "30px 0",
};

const h2 = {
    color: "#333",
    fontSize: "20px",
    fontWeight: "bold",
    margin: "20px 0",
};

const text = {
    color: "#333",
    fontSize: "16px",
    lineHeight: "24px",
};

const pre = {
    fontFamily: "inherit",
    whiteSpace: "pre-wrap" as const,
    margin: 0
}

const image = {
    borderRadius: "8px",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center" as const,
    marginTop: "48px",
};

export default InquiryEmail;
