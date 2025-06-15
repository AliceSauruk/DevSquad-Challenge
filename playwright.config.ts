import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://qa-training.sbx.devsquad.app',
    headless: false,
    viewport: { width: 1280, height: 720 },
  },
});
