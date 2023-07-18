import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.SERVER_PORT) || 3001,
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT,
    __API_URL__: JSON.stringify(process.env.API_URL),
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../client/src/components'),
      '@pages': path.resolve(__dirname, '../client/src/pages'),
      '@icons': path.resolve(__dirname, '../client/src/assets/icons'),
    },
  },
  ssr: {
    noExternal: ['styled-components', '@emotion/*'],
  },
});
