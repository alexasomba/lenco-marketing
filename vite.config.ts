import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import mdx from 'fumadocs-mdx/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import * as MdxConfig from './source.config';

const config = defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // Only group node_modules into vendor bundles
          // Don't manually chunk app code - let Vite/Rollup handle it to preserve initialization order
          if (id.includes('node_modules')) {
            // React must be in its own chunk and loaded first
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            // split some big libs that were showing up together in the visualizer
            // so we can load them in their own chunks and reduce `main`
            if (id.includes('motion') || id.includes('/motion/')) return 'vendor-motion';
            if (id.includes('orama')) return 'vendor-orama';
            if (id.includes('@floating-ui') || id.includes('floating-ui')) return 'vendor-floating';
            // seroval MUST be bundled with @tanstack to preserve initialization order
            // of ShallowErrorPlugin and other plugins
            if (id.includes('seroval') || id.includes('seroval-')) return 'vendor-tanstack';
            if (id.includes('@intercom') || id.includes('intercom')) return 'vendor-intercom';
            if (id.includes('@tanstack')) return 'vendor-tanstack';
            if (id.includes('fumadocs-mdx') || id.includes('fumadocs-core') || id.includes('fumadocs-ui') || id.includes('mdx')) return 'vendor-fumadocs';
            if (id.includes('lucide-react') || id.includes('simple-icons') || id.includes('svg-dotted-map')) return 'vendor-icons';
            if (id.includes('tailwind-merge') || id.includes('tailwindcss') || id.includes('@tailwindcss')) return 'vendor-tailwind';
            return 'vendor';
          }
          // Let Vite handle app code chunking automatically
        },
      },
    },
  },
  plugins: [
    devtools(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    mdx(MdxConfig),
    // add the visualizer plugin when ANALYZE=true so we can generate a report
    // in dist/stats.html without affecting normal builds
    ...(process.env.ANALYZE === 'true' ? [visualizer({ filename: 'dist/stats.html', gzipSize: true })] : []),
  ],
})

export default config
