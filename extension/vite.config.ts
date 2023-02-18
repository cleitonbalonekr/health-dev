import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifest from './public/manifest.json';
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    test: {
      globals: true,
      mockReset: true,
      passWithNoTests: true,
      environment: 'jsdom',
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.test.ts', 'src'],
    },
    define: {
      FIREBASE_CONFIG: {
        API_CLOUD_MESSAGE_KEY: env.FIREBASE_REQUEST_KEY,
      },
    },
    plugins: [tsconfigPaths(), crx({ manifest })],
  };
});
