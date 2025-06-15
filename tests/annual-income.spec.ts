import { test, expect } from '@playwright/test';

test('The form does not submit if Annual Income is empty', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('Alice');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('2000-01-01');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'São Paulo' }).click();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Client created successfully!')).not.toBeVisible();
});

test('Annual Income accepts a valid number', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('5000');
    await expect(page.getByRole('textbox', { name: 'Annual Income' })).toHaveValue('5,000');
});

test('Annual Income accepts zero as a valid input', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('0');
    await expect(page.getByRole('textbox', { name: 'Annual Income' })).toHaveValue('0')
});

test('Annual Income accepts negative numbers', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('-5000');
    await expect(page.getByRole('textbox', { name: 'Annual Income' })).toHaveValue('-5,000')
});

test('Annual Income accepts decimal numbers', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('0.89');
    await expect(page.getByRole('textbox', { name: 'Annual Income' })).toHaveValue('0.89');
});

test('Annual Income rejects non-numeric characters', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('a');
    await expect(page.getByRole('textbox', { name: 'Annual Income' })).toBeEmpty();
});

test('Annual Income rejects more than one decimal point', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('123.45.09');
    await page.getByRole('textbox', { name: 'Annual Income' }).press('.');
    await expect(page.getByRole('textbox', { name: 'Annual Income' })).toHaveValue('123.45');
});

test('Annual Income formats a large number with multiple commas', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('1234567');
    await expect(page.getByRole('textbox', { name: 'Annual Income' })).toHaveValue('1,234,567');
});

test('Annual Income filters out non-numeric characters when pasting', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('USD $98,765abc.45');
    await expect(page.getByRole('textbox', { name: 'Annual Income' })).toHaveValue('98,765.45');
});