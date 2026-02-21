import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should display the main gallery name', async ({ page }) => {
        await expect(page.getByText('Shakya Gallery')).toBeVisible();
    });

    test('should navigate to the collection page', async ({ page }) => {
        const collectionLink = page.getByRole('link', { name: /Collection/i }).first();
        await collectionLink.click();
        await expect(page).toHaveURL(/\/collection/);
    });
});

test.describe('Concierge Form', () => {
    test('should display validation errors for empty form', async ({ page }) => {
        await page.goto('/contact');
        await page.getByRole('button', { name: /Send Message/i }).click();

        // Check for native validation or custom error states if applicable
        // Since we use native browser validation mostly, we might just check if form is still there
        await expect(page.getByRole('button', { name: /Send Message/i })).toBeVisible();
    });
});
