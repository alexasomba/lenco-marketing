# Lenco Marketing Site - AI Coding Instructions

## Architecture Overview

This is a **TanStack Start + Fumadocs** marketing site deployed to **Cloudflare Workers**. It combines:
- **TanStack Router** for file-based routing (`src/routes/`)
- **Fumadocs** for MDX content (docs at `/docs/*`, blog at `/blog/*`)
- **Cloudflare Workers** for edge SSR via Vite plugin

### Key Data Flow
1. Routes in `src/routes/` define pages; TanStack auto-generates `src/routeTree.gen.ts`
2. MDX content in `content/docs/` and `content/blog/` → processed by `fumadocs-mdx` → served via source loaders
3. Splat routes (`src/routes/docs/$.tsx`, `src/routes/blog/$.tsx`) use server/client loader pattern for SSR

## Developer Workflows

```bash
pnpm dev          # Start dev server on port 3000
pnpm build        # Production build
pnpm deploy       # Build + deploy to Cloudflare Workers
pnpm cf-typegen   # Generate Cloudflare Worker types
pnpm test         # Run Vitest tests
```

## Project Conventions

### File Structure
- **Routes**: `src/routes/` - TanStack file-based routing
- **UI Components**: `src/components/ui/` - shadcn/ui components (new-york style)
- **Magic UI**: `src/components/magicui/` - Animation components from magicui.design
- **Docs Content**: `content/docs/` - MDX files for `/docs` routes
- **Blog Content**: `content/blog/` - MDX files for `/blog` routes
- **Source Loaders**: `src/lib/source.ts` (docs), `src/lib/blog-source.ts` (blog)

### Path Aliases
Use `@/` for src imports (configured in `tsconfig.json`):
```typescript
import { Button } from '@/components/ui/button'
import { source } from '@/lib/source'
import { blogSource } from '@/lib/blog-source'
```

### Component Patterns

**Adding shadcn/ui components**:
```bash
npx shadcn@latest add <component-name>
```
Components install to `src/components/ui/`. Uses `cn()` from `@/lib/utils` for class merging.

**Adding Magic UI components**:
```bash
npx shadcn@latest add "https://magicui.design/r/<component-name>.json"
```

### Route Patterns

**Standard page route** (`src/routes/index.tsx`):
```typescript
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/')({ component: PageComponent })
```

**Server function pattern** (see `src/routes/docs/$.tsx`, `src/routes/blog/$.tsx`):
```typescript
import { createServerFn } from '@tanstack/react-start'
const serverLoader = createServerFn({ method: 'GET' })
  .inputValidator((data) => data)
  .handler(async ({ data }) => { /* server-side logic */ })
```

### MDX Content (Fumadocs)

**Documentation** (`content/docs/`):
- Auto-generates routes under `/docs/*`
- Source loader: `src/lib/source.ts`

**Blog** (`content/blog/`):
- Auto-generates routes under `/blog/*`
- Source loader: `src/lib/blog-source.ts`
- Frontmatter schema in `source.config.ts` includes: `date`, `tags`, `featured`, `readTime`, `author`, `thumbnail`

**Adding a blog post**:
```mdx
---
title: "Post Title"
description: "Brief description"
date: "2024-12-01"
tags: ["Tag1", "Tag2"]
featured: true
readTime: "5 min read"
author: "Author Name"
thumbnail: "/images/post-thumbnail.jpg"
---

Your MDX content here...
```

### Styling
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- Styles entry: `src/styles.css`
- Use Tailwind classes directly; avoid custom CSS unless necessary
- Icons from `lucide-react`

## Cloudflare Workers Deployment

- Config in `wrangler.jsonc`
- Uses `@cloudflare/vite-plugin` for SSR environment
- Worker types in `worker-configuration.d.ts`
- Access Cloudflare bindings via `wrangler types` after adding to config

## Testing

- **Vitest** with React Testing Library
- JSDOM environment for component tests
- Run `pnpm test` for test execution
