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

interface InquiryEmailProps {
    inquirerName: string;
    inquirerEmail: string;
    inquirerMobile: string;
    shippingAddress: string;
    message?: string;
    cartItems: CartItem[];
    cartTotal: number;
    hasEstimate: boolean;
}

export const InquiryEmail = ({
    inquirerName,
    inquirerEmail,
    inquirerMobile,
    shippingAddress,
    message,
    cartItems = [],
    cartTotal = 0,
    hasEstimate = false,
}: InquiryEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>{`New Inquiry: ${cartItems.length} item(s) from ${inquirerName}`}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header */}
                    <Section style={headerSection}>
                        <Heading style={h1}>SHAKYA</Heading>
                        <Text style={subtitle}>NEW INQUIRY REQUEST</Text>
                    </Section>

                    <Hr style={hr} />

                    {/* Customer Details */}
                    <Section style={section}>
                        <Heading as="h2" style={h2}>Client Details</Heading>
                        <Row style={row}>
                            <Column style={columnLeft}><Text style={label}>Name:</Text></Column>
                            <Column style={columnRight}><Text style={value}>{inquirerName}</Text></Column>
                        </Row>
                        <Row style={row}>
                            <Column style={columnLeft}><Text style={label}>Email:</Text></Column>
                            <Column style={columnRight}><Link href={`mailto:${inquirerEmail}`} style={link}>{inquirerEmail}</Link></Column>
                        </Row>
                        <Row style={row}>
                            <Column style={columnLeft}><Text style={label}>Mobile:</Text></Column>
                            <Column style={columnRight}><Text style={value}>{inquirerMobile}</Text></Column>
                        </Row>
                    </Section>

                    <Hr style={hrLight} />

                    {/* Shipping Address */}
                    <Section style={section}>
                        <Heading as="h2" style={h2}>Shipping Destination</Heading>
                        <Text style={addressText}><pre style={pre}>{shippingAddress}</pre></Text>
                    </Section>

                    <Hr style={hrLight} />

                    {/* Selection Summary */}
                    <Section style={section}>
                        <Heading as="h2" style={h2}>Inquiry Selection ({cartItems.length})</Heading>
                        {cartItems.map((item, idx) => (
                            <Row key={idx} style={itemRow}>
                                <Column style={imageColumn}>
                                    <Img src={item.imageUrl} alt={item.title} width="80" height="auto" style={itemImage} />
                                </Column>
                                <Column style={detailsColumn}>
                                    <Text style={itemTitle}>{item.title}</Text>
                                    <Text style={itemArtist}>{item.artist}, {item.year}</Text>
                                    <Text style={itemPrice}>
                                        {(item.showPrice && item.price)
                                            ? `$${item.price.toLocaleString()}`
                                            : (item.startingPrice ? `Starts at $${item.startingPrice.toLocaleString()}` : 'Price on Request')}
                                    </Text>
                                    <Text style={itemId}>ID: {item._id}</Text>
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
                        <Text style={totalsNote}>* Shipping and bespoke framing costs not included.</Text>
                    </Section>

                    {/* Custom Message */}
                    {message && (
                        <Section style={messageSection}>
                            <Heading as="h2" style={h2}>Client Notes</Heading>
                            <Text style={messageText}>{message}</Text>
                        </Section>
                    )}

                    <Section style={footer}>
                        <Text style={footerText}>
                            Automated notification from Shakya Gallery Website.<br />
                            Please reply directly to this email to contact the client.
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

// --- Styles ---
const main = {
    backgroundColor: "#f6f9fc",
    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
};

const container = {
    backgroundColor: "#ffffff",
    margin: "40px auto",
    padding: "0",
    maxWidth: "600px",
    border: "1px solid #eaeaea",
    borderRadius: "4px",
    overflow: "hidden",
};

const headerSection = {
    padding: "40px 48px 20px",
    textAlign: "center" as const,
    backgroundColor: "#111111",
};

const h1 = {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: "300",
    letterSpacing: "0.2em",
    margin: "0 0 10px 0",
    fontFamily: 'Georgia, serif',
};

const subtitle = {
    color: "#a1a1aa",
    fontSize: "10px",
    letterSpacing: "0.1em",
    textTransform: "uppercase" as const,
    margin: "0",
};

const section = {
    padding: "24px 48px",
};

const h2 = {
    color: "#111",
    fontSize: "14px",
    fontWeight: "bold",
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    margin: "0 0 20px 0",
};

const row = {
    marginBottom: "12px",
};

const columnLeft = {
    width: "120px",
};

const columnRight = {};

const label = {
    color: "#71717a",
    fontSize: "13px",
    margin: "0",
};

const value = {
    color: "#111",
    fontSize: "14px",
    margin: "0",
};

const link = {
    color: "#111",
    fontSize: "14px",
    textDecoration: "underline",
};

const addressText = {
    color: "#111",
    fontSize: "14px",
    lineHeight: "1.6",
    margin: "0",
};

const pre = {
    fontFamily: "inherit",
    whiteSpace: "pre-wrap" as const,
    margin: 0,
};

const hr = {
    borderColor: "#e5e5e5",
    margin: "0",
};

const hrLight = {
    borderColor: "#f4f4f5",
    margin: "0 48px",
};

const itemRow = {
    marginBottom: "24px",
};

const imageColumn = {
    width: "100px",
    verticalAlign: "top" as const,
};

const itemImage = {
    borderRadius: "2px",
    border: "1px solid #f4f4f5",
};

const detailsColumn = {
    paddingLeft: "20px",
    verticalAlign: "top" as const,
};

const itemTitle = {
    fontSize: "16px",
    color: "#111",
    margin: "0 0 4px 0",
    fontFamily: 'Georgia, serif',
};

const itemArtist = {
    fontSize: "11px",
    color: "#71717a",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    margin: "0 0 8px 0",
};

const itemPrice = {
    fontSize: "13px",
    color: "#111",
    margin: "0 0 4px 0",
};

const itemId = {
    fontSize: "10px",
    color: "#a1a1aa",
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
    fontSize: "18px",
    color: "#111",
    fontWeight: "bold",
    margin: "0",
    fontFamily: 'Georgia, serif',
};

const totalsNote = {
    fontSize: "10px",
    color: "#a1a1aa",
    margin: "8px 0 0 0",
    fontStyle: "italic",
    textAlign: "right" as const,
};

const messageSection = {
    padding: "24px 48px",
    backgroundColor: "#fffdf0",
    borderBottom: "1px solid #eaeaea",
};

const messageText = {
    color: "#111",
    fontSize: "14px",
    lineHeight: "1.6",
    fontStyle: "italic",
    margin: "0",
};

const footer = {
    padding: "32px 48px",
    textAlign: "center" as const,
    backgroundColor: "#ffffff",
};

const footerText = {
    color: "#a1a1aa",
    fontSize: "11px",
    lineHeight: "1.5",
    margin: "0",
};

export default InquiryEmail;
