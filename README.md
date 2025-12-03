# Lenco Marketing Site

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Last Updated](https://img.shields.io/badge/last%20updated-2%20December%202025-green.svg)
![License](https://img.shields.io/badge/license-Proprietary-red.svg)
![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen.svg)
![pnpm](https://img.shields.io/badge/pnpm-%3E%3D9-orange.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![React](https://img.shields.io/badge/React-19-61DAFB.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.x-38B2AC.svg)
![Cloudflare Workers](https://img.shields.io/badge/Cloudflare%20Workers-deployed-F38020.svg)

The official marketing website and API documentation for [Lenco](https://lenco.co) - a business banking platform licensed by the Central Bank of Nigeria.

Built with **TanStack Start**, **Fumadocs**, and deployed on **Cloudflare Workers**.

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Deploy to Cloudflare Workers
pnpm deploy
```

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [TanStack Start](https://tanstack.com/start) | Full-stack React framework with SSR |
| [TanStack Router](https://tanstack.com/router) | File-based routing with type safety |
| [Fumadocs](https://fumadocs.vercel.app/) | Documentation framework for MDX content |
| [Tailwind CSS v4](https://tailwindcss.com/) | Utility-first CSS framework |
| [shadcn/ui](https://ui.shadcn.com/) | Accessible UI components |
| [Magic UI](https://magicui.design/) | Animated components |
| [Cloudflare Workers](https://workers.cloudflare.com/) | Edge SSR deployment |

## 📁 Project Structure

```
├── content/
│   ├── docs/           # API documentation (MDX)
│   │   ├── index.mdx   # Docs landing page
│   │   ├── getting-started.mdx
│   │   ├── accounts.mdx
│   │   ├── transactions.mdx
│   │   ├── transfers.mdx
│   │   ├── virtual-accounts.mdx
│   │   ├── webhooks.mdx
│   │   └── ...
│   └── blog/           # Blog posts (MDX)
│       ├── getting-started-with-lenco.mdx
│       └── ...
├── public/             # Static assets
│   └── images/
├── src/
│   ├── components/
│   │   ├── ui/         # shadcn/ui components
│   │   ├── magicui/    # Magic UI animated components
│   │   ├── blog/       # Blog-specific components
│   │   ├── LencoHeader.tsx
│   │   └── LencoFooter.tsx
│   ├── lib/
│   │   ├── source.ts       # Fumadocs loader (docs)
│   │   ├── blog-source.ts  # Fumadocs loader (blog)
│   │   └── utils.ts        # Utility functions
│   ├── routes/
│   │   ├── __root.tsx      # Root layout
│   │   ├── index.tsx       # Homepage
│   │   ├── blog/
│   │   │   ├── index.tsx   # Blog listing
│   │   │   └── $.tsx       # Blog post pages (splat route)
│   │   └── docs/
│   │       └── $.tsx       # Docs pages (splat route)
│   ├── router.tsx          # Router configuration
│   ├── routeTree.gen.ts    # Auto-generated route tree
│   └── styles.css          # Global styles
├── source.config.ts    # Fumadocs MDX configuration
├── vite.config.ts      # Vite configuration
└── wrangler.jsonc      # Cloudflare Workers config
```

## 📝 Content Management

### Adding Documentation Pages

1. Create a new `.mdx` file in `content/docs/`:

```mdx
---
title: Your Page Title
description: Brief description for SEO
---

# Your Page Title

Content goes here...
```

2. Add the page to the sidebar in `content/docs/meta.json`:

```json
{
  "pages": ["index", "getting-started", "your-new-page"]
}
```

### Adding Blog Posts

Create a new `.mdx` file in `content/blog/`:

```mdx
---
title: "Blog Post Title"
description: "Brief description"
date: "2024-12-01"
tags: ["Finance", "Business"]
featured: true
readTime: "5 min read"
author: "Author Name"
thumbnail: "/images/blog/thumbnail.jpg"
---

Your blog content here...
```

## 🎨 UI Components

### Adding shadcn/ui components

```bash
npx shadcn@latest add button
npx shadcn@latest add card
```

Components are installed to `src/components/ui/`.

### Adding Magic UI components

```bash
npx shadcn@latest add "https://magicui.design/r/shimmer-button.json"
```

Components are installed to `src/components/magicui/`.

## 🌙 Theming

The site supports light and dark modes using CSS custom properties. Theme tokens are defined in `src/styles.css`:

- `bg-background` / `text-foreground` - Main background/text
- `bg-muted` / `text-muted-foreground` - Secondary colors
- `bg-primary` / `text-primary` - Brand colors
- `bg-card` / `border-border` - Card and border colors

Use these tokens instead of hardcoded colors (e.g., `bg-white`, `text-gray-900`) to ensure proper theme support.

## 🔧 Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server on port 3000 |
| `pnpm build` | Build for production |
| `pnpm deploy` | Build and deploy to Cloudflare Workers |
| `pnpm cf-typegen` | Generate Cloudflare Worker types |
| `pnpm test` | Run Vitest tests |

### Path Aliases

Use `@/` for imports from the `src` directory:

```typescript
import { Button } from '@/components/ui/button'
import { source } from '@/lib/source'
import { cn } from '@/lib/utils'
```

## 🚢 Deployment

The site is deployed to Cloudflare Workers. Configuration is in `wrangler.jsonc`.

```bash
# Deploy to production
pnpm deploy
```

## 📚 API Documentation

The `/docs` section contains the complete Lenco API reference, migrated from the legacy readme.io documentation. It includes:

- **Getting Started** - Authentication and API basics
- **Accounts** - Manage bank accounts
- **Recipients** - Manage transfer recipients
- **Transactions** - View transaction history
- **Transfers** - Create bank transfers
- **Virtual Accounts** - Collection accounts
- **Bill Payments** - Airtime, data, electricity, cable TV
- **Webhooks** - Real-time event notifications
- **Error Codes** - API error reference
Note: Visiting `/docs` on this site now shows a local landing page that lets users select which version they want to view (v2 or v1). We are in the process of migrating the canonical ReadMe content into the repo under `content/docs/v2.0` and `content/docs/v1.0`.

- v2 docs (canonical ReadMe): https://lenco-api.readme.io/v2.0/reference/introduction
- v1 docs (legacy ReadMe): https://lenco-api.readme.io/reference/introduction

## 📄 License

Proprietary - Lenco Technology Limited

## 👤 Author

**Alex Asomba** - [@alexasomba](https://github.com/alexasomba)

