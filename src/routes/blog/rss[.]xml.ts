import { createFileRoute } from '@tanstack/react-router';
import { getBlogRSS } from '@/lib/rss';

export const Route = createFileRoute('/blog/rss.xml')({
  server: {
    handlers: {
      GET: async () => new Response(getBlogRSS(), { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } }),
    },
  },
});
