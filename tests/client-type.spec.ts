import { test, expect } from '@playwright/test';

test('Client Type allows selecting "Business" with mouse', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('radio', { name: 'Business' }).click();
    await expect(page.getByRole('radio', { name: 'Business' })).toBeChecked();
});

test('Client Type allows selecting "Individual" with mouse but then changes to "Business" automatically', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('radio', { name: 'Individual' }).click();
    await expect(page.getByRole('radio', { name: 'Individual' })).not.toBeChecked();
});

test('Client Type allows selecting "Individual" with keyboard (Spacebar) but then changes to "Business" automatically', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Address', exact: true }).click();
    await page.getByRole('textbox', { name: 'Address', exact: true }).press('Tab');
    await page.getByRole('combobox', { name: 'Country of Residence' }).press('Tab');
    await page.getByRole('radio', { name: 'Individual' }).press(' ');
    await expect(page.getByRole('radio', { name: 'individual' })).not.toBeChecked();
});

test('Client Type allows selecting "Individual" with keyboard (Enter) but then changes to "Business" automatically', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Address', exact: true }).click();
    await page.getByRole('textbox', { name: 'Address', exact: true }).press('Tab');
    await page.getByRole('combobox', { name: 'Country of Residence' }).press('Tab');
    await page.getByRole('radio', { name: 'Individual' }).press('Enter');
    await expect(page.getByRole('radio', { name: 'individual' })).not.toBeChecked();
});

test('Client Type radio does not allow unchecking once selected', async ({ page }) => {
  await page.goto('https://qa-training.sbx.devsquad.app/');
  await page.getByRole('radio', { name: 'Business' }).click();
  await expect(page.getByRole('radio', { name: 'Business' })).toBeChecked();
  await page.getByRole('radio', { name: 'Business' }).click();
  await expect(page.getByRole('radio', { name: 'Business' })).toBeChecked();
});