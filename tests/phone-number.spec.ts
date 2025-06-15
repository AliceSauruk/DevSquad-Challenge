import { test, expect } from '@playwright/test';

test('Phone Number accepts valid prefix and telephone numbers', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Phone Number', exact: true }).fill('11');
    await page.getByRole('textbox', { name: 'Enter phone number (e.g., (' }).fill('9876543210');
    await expect(page.getByRole('textbox', { name: 'Phone Number', exact: true })).toHaveValue('+11');
    await expect(page.getByRole('textbox', { name: 'Enter phone number (e.g., (' })).toHaveValue(' (987) 654-3210');
});

test('Phone Number rejects prefix with letters or symbols', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Phone Number', exact: true }).fill('ab');
    await expect(page.getByRole('textbox', { name: 'Phone Number', exact: true })).toHaveValue('+');
    await page.getByRole('textbox', { name: 'Phone Number', exact: true }).fill('!@');
    await expect(page.getByRole('textbox', { name: 'Phone Number', exact: true })).toHaveValue('+');
});

test('Phone Number rejects telephone with letters or symbols', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Enter phone number (e.g., (' }).fill('abcde12345');
    await expect(page.getByRole('textbox', { name: 'Enter phone number (e.g., (' })).toHaveValue(' (123) 45');
    await page.getByRole('textbox', { name: 'Enter phone number (e.g., (' }).fill('12345$6789');
    await expect(page.getByRole('textbox', { name: 'Enter phone number (e.g., (' })).toHaveValue(' (123) 456-789');
});

test('Phone Number limits prefix to maximum 2 digits', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Phone Number', exact: true }).fill('123');
    await expect(page.getByRole('textbox', { name: 'Phone Number', exact: true })).toHaveValue('+12');
});

test('Phone Number limits telephone to maximum 10 digits', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Enter phone number (e.g., (' }).fill('12345678901');
    await expect(page.getByRole('textbox', { name: 'Enter phone number (e.g., (' })).toHaveValue(' (123) 456-7890');
});

test('The form submits with Phone Number without prefix', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Enter phone number (e.g., (' }).fill('1234567890');
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

test('The form submits with Phone Number without telephone', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Phone Number', exact: true }).fill('11');
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

test('The form submits with invalid Phone Number input', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('Alice');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('1990-01-01');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'São Paulo' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('50000');
    await page.getByRole('textbox', { name: 'Phone Number', exact: true }).fill('a');
    await page.getByRole('textbox', { name: 'Enter phone number (e.g., (' }).fill('a12');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Client created successfully!')).toBeVisible();
});

test('The form submits successfully with Phone Number fields empty', async ({ page }) => {
  await page.goto('https://qa-training.sbx.devsquad.app/');
  await page.getByRole('textbox', { name: 'Full name' }).fill('Alice');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
  await page.getByRole('textbox', { name: 'Date of birth' }).fill('1990-01-01');
  await page.getByRole('combobox', { name: 'Country of Residence' }).click();
  await page.getByRole('option', { name: 'Brazil' }).click();
  await page.getByRole('combobox', { name: 'State' }).click();
  await page.getByRole('option', { name: 'São Paulo' }).click();
  await page.getByRole('textbox', { name: 'Annual Income' }).fill('50000');
  await page.getByRole('textbox', { name: 'Phone Number', exact: true }).fill('');
  await page.getByRole('textbox', { name: 'Enter phone number (e.g., (' }).fill('');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Client created successfully!')).toBeVisible();
});
