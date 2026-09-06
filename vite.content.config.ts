import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/content/index.ts'),
      name: 'LeetCodeContentScript',
      formats: ['iife'],
      fileName: () => 'assets/content.js',
    },
    rollupOptions: {
      output: {
        extend: true,
      },
    },
  },
});
