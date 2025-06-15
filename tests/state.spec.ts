import { test, expect } from '@playwright/test';

test('The form does not submit if State is empty', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'United States' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The state field is required.')).toBeVisible();
});

test('State is disabled until a country is selected', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await expect(page.getByLabel('State')).toBeDisabled();
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Canada' }).click();
    await expect(page.getByLabel('State')).toBeEnabled();
});

test('State for Brazil contains incorrect states', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await expect(page.getByRole('option', { name: 'Arizona' })).toBeVisible();
});

test('State for United States contains incorrect states', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'United States' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await expect(page.getByRole('option', { name: 'São Paulo' })).toBeVisible();
});

test('State for Canada contains incorrect states', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Canada' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await expect(page.getByRole('option', { name: 'Alaska' })).toBeVisible();
});

test('State does not allow selecting two states', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'United States' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'Alaska' }).click();
    await expect(page.getByLabel('State').locator('ui-selected')).toContainText('Alaska');
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'Arizona' }).click();
    await expect(page.getByLabel('State').locator('ui-selected')).toContainText('Arizona');
    await expect(page.getByLabel('State').locator('ui-selected')).not.toContainText('Alaska');
});

test('State does not update nor clears selection when changing the country', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'United States' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'Arizona' }).click();
    await expect(page.getByLabel('State').locator('ui-selected')).toContainText('Arizona');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Canada' }).click();
    await expect(page.getByLabel('State').locator('ui-selected')).toContainText('Arizona');
});