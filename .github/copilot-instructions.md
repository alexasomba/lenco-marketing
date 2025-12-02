# Lenco Marketing Site - AI Coding Instructions

## Architecture Overview

This is a **TanStack Start + Fumadocs** marketing site deployed to **Cloudflare Workers**. It combines:
- **TanStack Router** for file-based routing (`src/routes/`)
- **Fumadocs** for MDX documentation (`content/docs/`, rendered at `/docs/*`)
- **Cloudflare Workers** for edge SSR via Vite plugin

### Key Data Flow
1. Routes in `src/routes/` define pages; TanStack auto-generates `src/routeTree.gen.ts`
2. Documentation content lives in `content/docs/` → processed by `fumadocs-mdx` → served via `src/lib/source.ts`
3. The docs splat route (`src/routes/docs/$.tsx`) uses a server/client loader pattern for SSR

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
- **Shared Layout Config**: `src/lib/layout.shared.tsx` - Fumadocs layout options

### Path Aliases
Use `@/` for src imports (configured in `tsconfig.json`):
```typescript
import { Button } from '@/components/ui/button'
import { source } from '@/lib/source'
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

**Server function pattern** (see `src/routes/docs/$.tsx`):
```typescript
import { createServerFn } from '@tanstack/react-start'
const serverLoader = createServerFn({ method: 'GET' })
  .inputValidator((data) => data)
  .handler(async ({ data }) => { /* server-side logic */ })
```

### Documentation (Fumadocs)

- MDX files in `content/docs/` auto-generate routes under `/docs/*`
- Configure collections in `source.config.ts`
- Source loader defined in `src/lib/source.ts`
- Search API at `src/routes/api/search.ts` uses Orama

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
