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
    // Sidebar links removed — docs and blog are surfaced in the sidebar's
    // tree structure and an explicit 'Documentation' / 'Blog' link is not
    // needed in the docs layout. Keep `links` omitted so the layout renders
    // without extra top-level link buttons.
    githubUrl: 'https://github.com/lenco-africa/lenco-api',
  };
}

// Icons for sidebar tabs (version switcher)
export const sidebarTabIcons = {
  'API Reference': <Sparkles className="size-4" />,
  'API v1.0': <History className="size-4" />,
};