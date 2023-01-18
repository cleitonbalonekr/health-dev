import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    mockReset: true,
    passWithNoTests: true,
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.test.ts', 'src'],
  },
  plugins: [tsconfigPaths()],
});
