import { test, expect } from '@playwright/test';

test('Form does not submit with required fields empty', async ({ page }) => {
  await page.goto('https://qa-training.sbx.devsquad.app');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('The name field is required.')).toBeVisible();
  await expect(page.getByText('The email field is required.')).toBeVisible();
  await expect(page.getByText('The date of birth field is required.')).toBeVisible();
  await expect(page.getByText('The country field is required.')).toBeVisible();
  await expect(page.getByText('The state field is required.')).toBeVisible();
  await expect(page.getByText('Client created successfully!')).not.toBeVisible();
});

test('Form does not submit with some required fields filled only', async ({ page }) => {
  await page.goto('https://qa-training.sbx.devsquad.app');
  await page.getByRole('textbox', { name: 'Full name' }).fill('Alice');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Client created successfully!')).not.toBeVisible();
});

test('Annual income is required but does not show an error message when empty', async ({ page }) => {
  await page.goto('https://qa-training.sbx.devsquad.app');
  await page.getByRole('textbox', { name: 'Full name' }).fill('Alice');
  await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
  await page.getByRole('textbox', { name: 'Date of birth' }).fill('2000-01-01');
  await page.getByRole('combobox', { name: 'Country of Residence' }).click();
  await page.getByRole('option', { name: 'Brazil' }).click();
  await page.getByRole('combobox', { name: 'State' }).click();
  await page.getByRole('option', { name: 'São Paulo' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('The annual income field is required.')).not.toBeVisible();
  await expect(page.getByText('Client created successfully!')).not.toBeVisible();
});

test('Form submits successfully when all required fields are filled correctly', async ({ page }) => {
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