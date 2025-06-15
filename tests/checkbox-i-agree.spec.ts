import { test, expect } from '@playwright/test';

test('Checkbox "I agree to the Terms and Conditions" is not clickable with mouse', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    const checkbox = page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' });
    await checkbox.click({ force: true });
    await expect(checkbox).not.toBeChecked();
});

test('Checkbox can be unchecked via mouse click', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).press('Tab');
    await page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' }).press('Enter');
    const checkbox = page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' });
    await checkbox.click({ force: true });
    await expect(checkbox).not.toBeChecked();
});

test('Checkbox "I agree to the Terms and Conditions" can be checked via keyboard (Tab + Enter)', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).press('Tab');
    await page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' }).press('Enter');
    await page.getByRole('button', { name: 'Submit' }).click();
    const checkbox = page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' });
    await expect(checkbox).toBeChecked();
});

test('Checkbox can be unchecked via keyboard (Tab + Enter)', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).press('Tab');
    await page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' }).press('Enter');
    const checkbox = page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' });
    await expect(checkbox).toBeChecked();
    await page.keyboard.press('Enter');
    await expect(checkbox).not.toBeChecked();
});

test('Checkbox "I agree to the Terms and Conditions" can be checked via keyboard (Tab + Spacebar)', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).press('Tab');
    await page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' }).press(' ');
    await page.getByRole('button', { name: 'Submit' }).click();
    const checkbox = page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' });
    await expect(checkbox).toBeChecked();
  });

test('Checkbox can be unchecked via keyboard (Tab + Spacebar)', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Annual Income' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).press('Tab');
    await page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' }).press(' ');
    const checkbox = page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' });
    await expect(checkbox).toBeChecked();
    await page.keyboard.press(' ');
    await expect(checkbox).not.toBeChecked();
});

test('Form submits if the checkbox "I agree to the Terms and Conditions" is not checked', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('Alice');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('2000-01-01');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'São Paulo' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('50000');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Client created successfully!')).not.toBeVisible();
});

test('Form submits if the checkbox "I agree to the Terms and Conditions" is marked (Tab + Enter)', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('Alice');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('2000-01-01');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'São Paulo' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('50000');
    await page.getByRole('textbox', { name: 'Annual Income' }).press('Tab');
    await page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' }).press('Enter');
    await expect(page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' })).toBeChecked();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Client created successfully!')).toBeVisible();
});

test('Form submits if the checkbox "I agree to the Terms and Conditions" is marked (Tab + Spacebar)', async ({ page }) => {
    await page.goto('https://qa-training.sbx.devsquad.app/');
    await page.getByRole('textbox', { name: 'Full name' }).fill('Alice');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('alice@teste.com');
    await page.getByRole('textbox', { name: 'Date of birth' }).fill('2000-01-01');
    await page.getByRole('combobox', { name: 'Country of Residence' }).click();
    await page.getByRole('option', { name: 'Brazil' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('option', { name: 'São Paulo' }).click();
    await page.getByRole('textbox', { name: 'Annual Income' }).fill('50000');
    await page.getByRole('textbox', { name: 'Annual Income' }).press('Tab');
    await page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' }).press(' ');
    await expect(page.getByRole('checkbox', { name: 'I agree to the Terms and Conditions' })).toBeChecked();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Client created successfully!')).toBeVisible();
});