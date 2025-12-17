/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    // many deps ship CJS that may reference `module`; inline the tiny-warning
    // package so the worker transforms it to ESM and avoids runtime errors.
    server: {
      deps: {
        inline: ['tiny-warning'],
      },
    },
    // show more helpful stack traces during failures
    testTimeout: 5000,
  },
  resolve: {
    alias: {
      'tiny-warning': 'tiny-warning/dist/tiny-warning.esm.js',
      '@': resolve(__dirname, 'src'),
      '@/': resolve(__dirname, 'src') + '/',
    },
  },
})