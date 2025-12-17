# Lenco Marketing Site — Copilot Instructions

## Big Picture

- TanStack Start app deployed to Cloudflare Workers (SSR via `@cloudflare/vite-plugin`).
- Routing is TanStack Router file-based routes in `src/routes/`; the tree is generated in `src/routeTree.gen.ts`.
- Docs + Blog are Fumadocs MDX collections:
  - Docs content: `content/docs/` → served under `/docs/*`
  - Blog content: `content/blog/` → served under `/blog/*`
  - Generated collection modules live in `.source/` (generated at dev/build; don’t hand-edit).

## Key Flows / Patterns

- Docs pages: `src/routes/docs/$.tsx` uses server + client loader.
  - Server should return serializable data only; page tree is sent via `source.serializePageTree(...)`.
  - Client rehydrates with `deserializePageTree(...)` then renders `DocsLayout`.
- Raw MDX endpoint for copy/LLM: `src/routes/docs.mdx.$.ts` serves markdown; `src/start.ts` rewrites `/docs/*.mdx` → `/docs.mdx/*`.
- Blog pages: `src/routes/blog/$.tsx` follows the same server/client loader idea.

## Dev Workflows

```bash
pnpm dev                  # http://localhost:3000
pnpm build                # production build (client + SSR)
pnpm test                 # vitest
pnpm exec tsc --noEmit    # typecheck
pnpm deploy               # build + wrangler deploy
pnpm cf-typegen           # regenerate Worker types
```

## Conventions

- Use `@/` alias for `src/*` imports (see `tsconfig.json`).
- UI: shadcn/ui in `src/components/ui/` (new-york style) + Magic UI in `src/components/magicui/`.
- Styling: Tailwind v4; prefer theme tokens from `src/styles.css` (avoid hard-coded colors).
- Docs navigation is driven by `content/docs/**/meta.json`; entries like `---Section---` are separators (not files).

## “Gotchas” (repo-specific)

- Cloudflare dev runner may bind an internal port (commonly `42069`); if `pnpm dev` fails with `EADDRINUSE :::42069`, kill the stale node process.
- Router-level not-found handling is configured in `src/router.tsx` via `defaultNotFoundComponent`.
