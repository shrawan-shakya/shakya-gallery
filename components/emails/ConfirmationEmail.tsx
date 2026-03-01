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
    Hr,
    Row,
    Column
} from "@react-email/components";
import * as React from "react";

interface CartItem {
    _id: string;
    title: string;
    artist: string;
    year: string;
    price?: number;
    showPrice?: boolean;
    startingPrice?: number;
    imageUrl: string;
}

interface ConfirmationEmailProps {
    inquirerName: string;
    cartItems: CartItem[];
    cartTotal: number;
    hasEstimate: boolean;
}

export const ConfirmationEmail = ({
    inquirerName,
    cartItems = [],
    cartTotal = 0,
    hasEstimate = false,
}: ConfirmationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>We received your inquiry at Shakya Gallery.</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={headerSection}>
                        <Heading style={h1}>SHAKYA</Heading>
                        <Text style={subtitle}>INQUIRY RECEIVED</Text>
                    </Section>

                    {/* Greeting */}
                    <Section style={greetingSection}>
                        <Text style={greetingText}>Dear {inquirerName},</Text>
                        <Text style={paragraph}>
                            Thank you for your interest in Shakya Gallery. We have successfully received your inquiry regarding the following {cartItems.length} piece{cartItems.length === 1 ? '' : 's'}.
                        </Text>
                        <Text style={paragraph}>
                            Our curation team is currently reviewing your selection and calculating the most secure shipping options to your destination. You can expect a personalized quote and a secure invoice link from a gallery advisor within <strong>24 hours</strong>.
                        </Text>
                    </Section>

                    <Hr style={hrLight} />

                    {/* Selection Summary */}
                    <Section style={section}>
                        <Heading as="h2" style={h2}>Your Selection</Heading>
                        {cartItems.map((item, idx) => (
                            <Row key={idx} style={itemRow}>
                                <Column style={imageColumn}>
                                    <Img src={item.imageUrl} alt={item.title} width="100" height="auto" style={itemImage} />
                                </Column>
                                <Column style={detailsColumn}>
                                    <Text style={itemTitle}>{item.title}</Text>
                                    <Text style={itemArtist}>{item.artist}, {item.year}</Text>
                                    <Text style={itemPrice}>
                                        {(item.showPrice && item.price)
                                            ? `$${item.price.toLocaleString()}`
                                            : (item.startingPrice ? `Starts at $${item.startingPrice.toLocaleString()}` : 'Price on Request')}
                                    </Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    {/* Totals */}
                    <Section style={totalsSection}>
                        <Row>
                            <Column><Text style={totalLabel}>Estimated Subtotal:</Text></Column>
                            <Column align="right">
                                <Text style={totalValue}>
                                    {hasEstimate ? "Starting at " : ""}${cartTotal.toLocaleString()}
                                </Text>
                            </Column>
                        </Row>
                        <Text style={totalsNote}>* Exact shipping and taxes will be added to your final invoice.</Text>
                    </Section>

                    <Hr style={hrLight} />

                    {/* Contact Action */}
                    <Section style={actionSection}>
                        <Text style={actionText}>
                            Prefer an immediate update?
                        </Text>
                        <Link href="https://wa.me/9779841234567" style={button}>
                            Chat on WhatsApp
                        </Link>
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            <strong>Shakya Gallery</strong><br />
                            Kathmandu, Nepal<br />
                            <Link href="https://shakyagallery.com" style={footerLink}>www.shakyagallery.com</Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// --- Styles ---
const main = {
    backgroundColor: "#f3f3f3",
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "40px auto",
    padding: "0",
    maxWidth: "600px",
    border: "1px solid #e0e0e0",
};

const headerSection = {
    padding: "48px 48px 32px",
    textAlign: "center" as const,
};

const h1 = {
    color: "#111",
    fontSize: "32px",
    fontWeight: "normal",
    letterSpacing: "0.15em",
    margin: "0 0 16px 0",
    fontFamily: 'Georgia, serif',
};

const subtitle = {
    color: "#71717a",
    fontSize: "10px",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    margin: "0",
};

const greetingSection = {
    padding: "0 48px 32px",
};

const greetingText = {
    fontSize: "16px",
    color: "#111",
    marginBottom: "16px",
    fontFamily: 'Georgia, serif',
};

const paragraph = {
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#3f3f46",
    margin: "0 0 16px 0",
};

const hrLight = {
    borderColor: "#e5e5e5",
    margin: "0 48px",
};

const section = {
    padding: "32px 48px",
};

const h2 = {
    color: "#111",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    margin: "0 0 24px 0",
};

const itemRow = {
    marginBottom: "24px",
};

const imageColumn = {
    width: "120px",
    verticalAlign: "top" as const,
};

const itemImage = {
    border: "1px solid #f4f4f5",
};

const detailsColumn = {
    paddingLeft: "24px",
    verticalAlign: "top" as const,
};

const itemTitle = {
    fontSize: "18px",
    color: "#111",
    margin: "0 0 6px 0",
    fontFamily: 'Georgia, serif',
};

const itemArtist = {
    fontSize: "11px",
    color: "#71717a",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    margin: "0 0 12px 0",
};

const itemPrice = {
    fontSize: "14px",
    color: "#111",
    margin: "0",
};

const totalsSection = {
    padding: "24px 48px",
    backgroundColor: "#fafafa",
    borderTop: "1px solid #eaeaea",
    borderBottom: "1px solid #eaeaea",
};

const totalLabel = {
    fontSize: "14px",
    color: "#71717a",
    margin: "0",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
};

const totalValue = {
    fontSize: "20px",
    color: "#111",
    margin: "0",
    fontFamily: 'Georgia, serif',
};

const totalsNote = {
    fontSize: "10px",
    color: "#a1a1aa",
    margin: "12px 0 0 0",
    fontStyle: "italic",
    textAlign: "right" as const,
};

const actionSection = {
    padding: "40px 48px",
    textAlign: "center" as const,
};

const actionText = {
    fontSize: "14px",
    color: "#71717a",
    marginBottom: "20px",
};

const button = {
    backgroundColor: "#111",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "normal",
    textDecoration: "none",
    padding: "16px 32px",
    textTransform: "uppercase" as const,
    letterSpacing: "0.15em",
    display: "inline-block",
};

const footer = {
    padding: "32px 48px",
    textAlign: "center" as const,
    backgroundColor: "#111",
};

const footerText = {
    color: "#a1a1aa",
    fontSize: "11px",
    lineHeight: "1.8",
    margin: "0",
    letterSpacing: "0.05em",
};

const footerLink = {
    color: "#fff",
    textDecoration: "underline",
};

export default ConfirmationEmail;
