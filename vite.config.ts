import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const root = path.resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root,
  base: './',
  publicDir: path.resolve(root, '../public'),
  build: {
    outDir: path.resolve(root, '../dist'),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 4000,
    open: true,
  },
});
