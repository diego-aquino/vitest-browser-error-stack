/// <reference types="vitest/config" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    name: 'browser',
    include: ['./*.test.ts'],
    // environment: 'node',
    browser: {
      instances: [{ browser: 'chromium' }],
      provider: 'playwright',
      enabled: true,
      headless: true,
    },
  },
});
