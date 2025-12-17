import { defineConfig } from 'vite'
import { fileURLToPath } from 'node:url'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'
import mdx from 'fumadocs-mdx/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import * as MdxConfig from './source.config';

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

const config = defineConfig({
  resolve: {
    // Vite's dependency crawler (especially for SSR environments) doesn't
    // reliably honor `vite-tsconfig-paths` during pre-bundling, so keep these
    // critical aliases explicit.
    alias: {
      '@': r('./src'),
      'fumadocs-mdx:collections/server': r('./.source/server.ts'),
      'fumadocs-mdx:collections/browser': r('./.source/browser.ts'),
    },
  },
  optimizeDeps: {
    include: [
      'lucide-react',
      'motion/react',
      // Fumadocs + MDX runtime entrypoints used in docs/blog.
      'fumadocs-core/source',
      'fumadocs-mdx/runtime/server',
      'fumadocs-ui/layouts/docs',
      'fumadocs-ui/layouts/docs/page',
      'fumadocs-ui/mdx',
      'fumadocs-ui/components/card',
      'fumadocs-ui/provider/tanstack',
    ],
    // Ensure the dep optimizer scans our SSR entrypoints up-front to avoid the
    // "new version of the pre-bundle" churn after the first request.
    entries: [
      'src/start.ts',
      'src/router.tsx',
      'src/routes/**/*.{ts,tsx}',
      '.source/server.ts',
      '.source/browser.ts',
    ],
    holdUntilCrawlEnd: true,
  },
  environments: {
    // Cloudflare module runner environment configured by the @cloudflare/vite-plugin
    ssr: {
      optimizeDeps: {
        // The Cloudflare dev runner can't tolerate SSR pre-bundle changes after
        // startup (it throws on "new version of the pre-bundle"). Disable
        // runtime discovery and keep the include list above in sync.
        noDiscovery: true,
        include: [
          'lucide-react',
          'motion/react',
          'fumadocs-core/source',
          'fumadocs-mdx/runtime/server',
          'fumadocs-ui/layouts/docs',
          'fumadocs-ui/layouts/docs/page',
          'fumadocs-ui/mdx',
          'fumadocs-ui/components/card',
          'fumadocs-ui/provider/tanstack',
        ],
        entries: [
          'src/start.ts',
          'src/router.tsx',
          'src/routes/**/*.{ts,tsx}',
          '.source/server.ts',
        ],
        holdUntilCrawlEnd: true,
      },
    },
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
