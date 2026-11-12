import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/types/**/*', 'src/generated/**/*', 'src/lib/prisma.ts'],
    },
  },
});
