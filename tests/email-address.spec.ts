import { test, expect } from '@playwright/test';

test('Email Address is required', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The email field is required.')).toBeVisible();
});

test('Email Address accepts valid email', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('Alice');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The email field must be a valid email address.')).not.toBeVisible();
});

test('Email Address accepts email with only one character before and after "@"', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('a@b');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The email field must be a valid email address.')).not.toBeVisible();
});

test('Email Address accepts spaces in email', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('test @example.com');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The email field must be a valid email address.')).not.toBeVisible();
});

test('Email Address rejects email without "@"', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('invalidemail.com');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The email field must be a valid email address.')).toBeVisible();
});

test('Email Address rejects email with invalid characters', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('!@#$$@email.com');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The email field must be a valid email address.')).toBeVisible();
});

test('Email Address rejects extra dots after domain', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('test@example..com.');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('The email field must be a valid email address.')).toBeVisible();
  });