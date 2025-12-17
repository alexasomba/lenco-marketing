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
  optimizeDeps: {
    include: ['lucide-react', 'motion/react'],
  },
  build: {
    rollupOptions: {
      output: {
        // Disable manual chunking entirely - let Vite/Rollup handle it
        // to preserve proper initialization order. Manual chunking was
        // causing "Cannot access X before initialization" errors due to
        // circular dependencies between chunks.
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
