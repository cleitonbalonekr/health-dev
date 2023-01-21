import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['vitest-localstorage-mock'],
    mockReset: true,
    passWithNoTests: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.test.ts', 'src'],
  },
  plugins: [tsconfigPaths()],
});
