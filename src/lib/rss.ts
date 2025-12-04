import { Feed } from 'feed';
// source is imported lazily inside getRSS() to avoid importing fumadocs runtime during tests
import { blogSource } from '@/lib/blog-source';

// Prefer SITE_URL env var, fallback to the marketing domain and Cloudflare preview if available
const DEFAULT_BASE = process.env.VITE_SITE_URL || 'https://lenco.co';

/**
 * Existing site-level feed (keeps old behaviour but uses configured site URL)
 */
export async function getRSS() {
  const baseUrl = DEFAULT_BASE;

  const { source } = await import('@/lib/source');

  const feed = new Feed({
    title: 'Fumadocs Blog',
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    language: 'en',

    image: `${baseUrl}/banner.png`,
    favicon: `${baseUrl}/icon.png`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Fuma Nama`,
  });

  for (const page of source.getPages()) {
    feed.addItem({
      id: `${baseUrl}${page.url}`,
      title: page.data.title,
      description: page.data.description,
      link: `${baseUrl}${page.url}`,
      // `lastModified` may not exist on the typed frontmatter, access via `any`
      date: new Date(((page.data as any).lastModified as string | undefined) ?? new Date()),

      author: [
        {
          name: 'Fuma',
        },
      ],
    });
  }

  return feed.rss2();
}

/**
 * Blog-specific RSS feed (feeds the blog posts under /blog)
 */
export function getBlogRSS() {
  const baseUrl = DEFAULT_BASE;

  const feed = new Feed({
    title: 'Lenco Blog',
    id: `${baseUrl}/blog`,
    link: `${baseUrl}/blog`,
    language: 'en',
    image: `${baseUrl}/images/placeholder.svg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Lenco`,
  });

  for (const page of blogSource.getPages()) {
    // lastModified is not present on the typed frontmatter; check any
    const lastModified = ((page.data as any).lastModified as string | undefined) ?? page.data.date;
    feed.addItem({
      id: `${baseUrl}${page.url}`,
      title: page.data.title,
      description: page.data.description,
      link: `${baseUrl}${page.url}`,
      date: new Date(lastModified),
      author: Array.isArray(page.data.author)
        ? page.data.author.map((a: any) => ({ name: typeof a === 'string' ? a : a.name }))
        : [{ name: typeof page.data.author === 'string' ? page.data.author : (page.data.author as any)?.name || 'Lenco' }],
    });
  }

  return feed.rss2();
}