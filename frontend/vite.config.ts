/// <reference types="vitest/config" />
import { loadEnv, defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
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
    plugins: [react(), tsconfigPaths()],
    define: {
      FIREBASE_CONFIG: {
        FIREBASE_API_KEY: env.VITE_FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: env.VITE_FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: env.VITE_FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: env.VITE_FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: env.VITE_FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: env.VITE_FIREBASE_MEASUREMENT_ID,
      },
    },
  };
});
