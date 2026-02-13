
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
} from "@react-email/components";
import * as React from "react";

interface ContactEmailProps {
    name: string;
    email: string;
    interest: string;
    message: string;
}

export const ContactEmail = ({
    name,
    email,
    interest,
    message,
}: ContactEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>New General Inquiry from {name}</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={h1}>General Inquiry</Heading>

                    <Section style={section}>
                        <Text style={label}>From:</Text>
                        <Text style={text}>{name} (<Link href={`mailto:${email}`}>{email}</Link>)</Text>

                        <Text style={label}>Interest:</Text>
                        <Text style={text}>{interest}</Text>
                    </Section>

                    <Section style={section}>
                        <Heading as="h2" style={h2}>Message</Heading>
                        <Text style={text}><pre style={pre}>{message}</pre></Text>
                    </Section>

                    <Text style={footer}>
                        Sent via Shakya Gallery Contact Page
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
    maxWidth: "600px"
};

const section = {
    padding: "0 48px",
    marginBottom: "24px"
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
    fontSize: "18px",
    fontWeight: "bold",
    margin: "0 0 10px",
    borderBottom: "1px solid #eee",
    paddingBottom: "10px"
};

const label = {
    color: "#8898aa",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    marginBottom: "4px"
};

const text = {
    color: "#333",
    fontSize: "16px",
    lineHeight: "24px",
    marginBottom: "16px"
};

const pre = {
    fontFamily: "inherit",
    whiteSpace: "pre-wrap" as const,
    margin: 0
}

const footer = {
    color: "#8898aa",
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center" as const,
    marginTop: "48px",
};

export default ContactEmail;
