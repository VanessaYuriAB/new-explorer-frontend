import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import postcss from '@vituum/vite-plugin-postcss';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), postcss({ configFilePath: './postcss.config.js' })],

  server: {
    port: 3000,
    open: true,
  },
});
