import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: [
        'node_modules/**',
        'src/__tests__/**',
        'src/core/types.ts',
        'src/core/constants.ts',
        'src/core/index.ts',
        'src/core/renderer.ts',
        'src/index.ts',
        'src/cli/index.ts',
        'src/bin/lyric-timer.ts',
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
    environment: 'node',
    globals: true,
  },
});
