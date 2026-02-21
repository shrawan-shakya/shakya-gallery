import { describe, it, expect } from 'vitest';
import { siteConfig } from './config';

describe('siteConfig', () => {
    it('should have all required fields', () => {
        expect(siteConfig.name).toBe('Shakya Gallery');
        expect(siteConfig.contact.email).toContain('shakyagallery.com');
    });

    it('should have social links defined', () => {
        expect(siteConfig.links.instagram).toBeDefined();
        expect(siteConfig.links.linkedin).toBeDefined();
    });

    it('should have FAQ items', () => {
        expect(siteConfig.faqs.length).toBeGreaterThan(0);
    });
});
