import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Book, Sparkles, History } from 'lucide-react';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <Book className="size-5" />
          Lenco Docs
        </span>
      ),
      url: '/docs',
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
        active: 'nested-url',
      },
      {
        text: 'Blog',
        url: '/blog',
      },
    ],
    githubUrl: 'https://github.com/lenco-africa/lenco-api',
  };
}

// Icons for sidebar tabs (version switcher)
export const sidebarTabIcons = {
  'API Reference': <Sparkles className="size-4" />,
  'API v1.0': <History className="size-4" />,
};