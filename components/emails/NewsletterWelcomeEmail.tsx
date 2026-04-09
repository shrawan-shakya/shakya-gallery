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
} from "@react-email/components";
import * as React from "react";

export const NewsletterWelcomeEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the SHAKYA Gallery Collector's Circle.</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={headerSection}>
            <Heading style={h1}>SHAKYA</Heading>
            <Text style={subtitle}>COLLECTOR&apos;S CIRCLE</Text>
          </Section>

          {/* Content */}
          <Section style={contentSection}>
            <Text style={greetingText}>Welcome to the Circle,</Text>
            <Text style={paragraph}>
              It is a pleasure to have you with us. By joining the
              Collector&apos;s Circle, you have gained early access to our most
              exclusive acquisitions and private viewing rooms.
            </Text>
            <Text style={paragraph}>
              Shakya Gallery is dedicated to curating the finest Himalayan
              masterworks. As a member, you will receive:
            </Text>
            <ul style={list}>
              <li style={listItem}>
                Priority notification on new Thangka and Paubha releases.
              </li>
              <li style={listItem}>
                Bi-monthly insights into Himalayan art history and preservation.
              </li>
              <li style={listItem}>
                Invitations to private digital exhibitions.
              </li>
            </ul>
            <Text style={paragraph}>
              We look forward to sharing the profound beauty and heritage of our
              collection with you.
            </Text>
          </Section>

          <Hr style={hrLight} />

          {/* CTA */}
          <Section style={actionSection}>
            <Text style={actionText}>Explore the current collection</Text>
            <Link href="https://shakyagallery.com/collection" style={button}>
              View Gallery
            </Link>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              <strong>Shakya Gallery</strong>
              <br />
              Since 1998 • Kathmandu, Nepal
              <br />
              <Link href="https://shakyagallery.com" style={footerLink}>
                shakyagallery.com
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// --- Styles ---
const main = {
  backgroundColor: "#ffffff",
  fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "0",
  maxWidth: "600px",
  border: "1px solid #f0f0f0",
};

const headerSection = {
  padding: "64px 48px 48px",
  textAlign: "center" as const,
  backgroundColor: "#fcfcfc",
};

const h1 = {
  color: "#111",
  fontSize: "36px",
  fontWeight: "normal",
  letterSpacing: "0.2em",
  margin: "0 0 16px 0",
  fontFamily: "Georgia, serif",
};

const subtitle = {
  color: "#71717a",
  fontSize: "10px",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  margin: "0",
};

const contentSection = {
  padding: "48px 48px 32px",
};

const greetingText = {
  fontSize: "20px",
  color: "#111",
  marginBottom: "24px",
  fontFamily: "Georgia, serif",
  fontStyle: "italic",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "1.8",
  color: "#3f3f46",
  margin: "0 0 20px 0",
};

const list = {
  margin: "0 0 32px 0",
  padding: "0 0 0 20px",
};

const listItem = {
  fontSize: "14px",
  color: "#52525b",
  marginBottom: "12px",
  lineHeight: "1.6",
};

const hrLight = {
  borderColor: "#f4f4f5",
  margin: "0 48px",
};

const actionSection = {
  padding: "48px 48px",
  textAlign: "center" as const,
};

const actionText = {
  fontSize: "14px",
  color: "#71717a",
  marginBottom: "24px",
  letterSpacing: "0.05em",
};

const button = {
  backgroundColor: "#111",
  color: "#fff",
  fontSize: "12px",
  fontWeight: "normal",
  textDecoration: "none",
  padding: "18px 36px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.2em",
  display: "inline-block",
};

const footer = {
  padding: "48px",
  textAlign: "center" as const,
  backgroundColor: "#111",
};

const footerText = {
  color: "#71717a",
  fontSize: "11px",
  lineHeight: "1.8",
  margin: "0",
  letterSpacing: "0.05em",
};

const footerLink = {
  color: "#ffffff",
  textDecoration: "underline",
};

export default NewsletterWelcomeEmail;
