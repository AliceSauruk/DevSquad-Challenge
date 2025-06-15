import { test, expect } from '@playwright/test';

test('The form does not submit if Country of Residence is empty', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The country field is required.')).toBeVisible();
});

test('Country of Residence only contains three specific countries', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await expect(page.getByRole('option', { name: 'Brazil' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'United States' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Canada' })).toBeVisible();
});

test('Country of Residence does not allow selecting two countries', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await expect(page.getByLabel('Country of Residence').locator('ui-selected')).toContainText('Brazil');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'United States' }).click();
    await expect(page.getByLabel('Country of Residence').locator('ui-selected')).toContainText('United States');
});