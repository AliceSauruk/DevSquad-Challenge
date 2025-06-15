import { test, expect } from '@playwright/test';

test('The form does not submit if Date of birth is empty', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The date of birth field is required.')).toBeVisible();
});

test('Date of birth is accessible via keyboard navigation (Tab)', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).click();
    await page.getByRole('textbox', { name: 'Full name' }).press('Tab');
    await page.getByRole('textbox', { name: 'Email Address' }).press('Tab');
    await page.getByRole('textbox', { name: 'Phone Number', exact: true }).press('Tab');
    await page.getByRole('textbox', { name: 'Enter phone number (e.g., (' }).press('Tab');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('2001-12-12');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The date of birth field is required.')).not.toBeVisible();
  });

test('Date of birth accepts valid date', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('1990-12-31');
    await expect(page.getByRole('textbox', { name: 'Date of birth' })).toHaveValue('1990-12-31');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The date of birth field is required.')).not.toBeVisible();
});

test('Date of birth accepts a future date', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('2550-12-31');
    await expect(page.getByRole('textbox', { name: 'Date of birth' })).toHaveValue('2550-12-31');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The date of birth field is required.')).not.toBeVisible();
});

test('Date of birth rejects invalid dates', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill(' ');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The date of birth field is required.')).toBeVisible();
});

test('Date of birth rejects different formats like YYYY/DD/MM', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('2112-09-19');
    await expect(page.getByRole('textbox', { name: 'Date of birth' })).not.toHaveValue('1990-21-12');
});

test('Date of birth has a minimum valid date (0001-01-01)', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('0001-01-01');
    await expect(page.getByRole('textbox', { name: 'Date of birth' })).toHaveValue('0001-01-01');
});

test('Date of birth has maximum valid date (9999-12-31)', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('9999-12-31');
    await expect(page.getByRole('textbox', { name: 'Date of birth' })).toHaveValue('9999-12-31');
});

