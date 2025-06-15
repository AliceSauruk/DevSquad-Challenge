import { test, expect } from '@playwright/test';

test('Full Name is required', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The name field is required.')).toBeVisible();
});

test('Full Name must have at least 2 characters', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('A');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The name field must be at least 2 characters.')).toBeVisible();
});

test('Full Name must not exceed 50 characters', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    const longName = 'A'.repeat(51);
    await page.getByRole('textbox', { name: 'Full name' }).fill(longName);
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The name field must not be greater than 50 characters.')).toBeVisible();
});

test('Full Name accepts characters like numbers and symbols', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill("Alice Dal'Mendes The 2nd");
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The name field is required.')).not.toBeVisible();
});

test('Full Name accepts accented characters', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('Érica da Silva');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The name field is required.')).not.toBeVisible();
});

test('Full Name accepts spaces before/after the name', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill(' João ');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The name field is required.')).not.toBeVisible();
});

test('Full Name accepts special characters only', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('@@@');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The name field is required.')).not.toBeVisible();
});

test('Full Name rejects spaces only', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('           ');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('2000-01-01');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'São Paulo' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('40000');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The name field is required.')).toBeVisible();
});