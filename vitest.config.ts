/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
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
    alias: [
      { find: 'tiny-warning', replacement: 'tiny-warning/dist/tiny-warning.esm.js' },
      { find: '@', replacement: '/Users/alexasomba/Documents/GitHub/alexasomba/lenco-marketing/src' },
      { find: '@/', replacement: '/Users/alexasomba/Documents/GitHub/alexasomba/lenco-marketing/src/' },
    ],
  },
})