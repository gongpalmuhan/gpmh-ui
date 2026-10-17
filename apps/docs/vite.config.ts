import { fileURLToPath, URL } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@gpmh/tokens/tokens.css', replacement: fromRoot('../../packages/tokens/src/tokens.css') },
      { find: '@gpmh/ui/styles.css', replacement: fromRoot('../../packages/ui/src/styles.css') },
      { find: '@gpmh/ui', replacement: fromRoot('../../packages/ui/src/index.ts') }
    ]
  }
});
