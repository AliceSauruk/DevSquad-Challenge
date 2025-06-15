import { test, expect } from '@playwright/test';

test('The form submits even if Address is empty', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('Alice');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('2000-01-01');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'São Paulo' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('40000');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Client created successfully!')).toBeVisible();
});

test('Address field must not exceed 250 characters', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    const longAdress = 'A'.repeat(400)
    await page.getByRole('textbox', { name: 'Address', exact: true }).fill(longAdress);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The address field must not be greater than 250 characters.')).toBeVisible();
});

test('Address field accepts single-line address', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Address', exact: true }).fill('123 Main Street, Anytown, USA 12345');
    await expect(page.getByRole('textbox', { name: 'Address', exact: true })).toHaveValue('123 Main Street, Anytown, USA 12345');
});

test('Address field accepts a multi-line address', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Address', exact: true }).fill('Apt 4B123 Main Street\nAnytown, USA 12345');
    await expect(page.getByRole('textbox', { name: 'Address', exact: true })).toHaveValue('Apt 4B123 Main Street\nAnytown, USA 12345');
});

test('Address field accepts numbers and common special characters', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Address', exact: true }).fill('Rua #123-A, Bairro "Centro", Apt. 4/5.');
    await expect(page.getByRole('textbox', { name: 'Address', exact: true })).toHaveValue('Rua #123-A, Bairro "Centro", Apt. 4/5.');
});