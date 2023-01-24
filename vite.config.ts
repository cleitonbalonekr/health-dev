import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { crx } from '@crxjs/vite-plugin';
import manifest from './public/manifest.json';
export default defineConfig({
  test: {
    globals: true,
    setupFiles: ['vitest-localstorage-mock'],
    mockReset: true,
    passWithNoTests: true,
    environment: 'jsdom',
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.test.ts', 'src'],
  },
  plugins: [tsconfigPaths(), crx({ manifest })],
});
