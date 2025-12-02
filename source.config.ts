import { defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

// Author and tag lists defined inline (fumadocs-mdx only allows collection exports)
const BLOG_AUTHORS = ['alex-asomba', 'lenco-team'] as const;
const BLOG_TAGS = [
  'Getting Started',
  'Business',
  'Nigeria',
  'API',
  'Business Banking',
  'Guide',
  'Cash Flow',
  'Finance Tips',
  'Small Business',
  'Tips',
  'Finance',
  'Zambia',
] as const;

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

// Blog also uses defineDocs pattern for consistency with fumadocs-mdx collections
export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      // Date must follow exact YYYY-MM-DD (ISO date without time) to keep frontmatter consistent
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
      // Use centralized tag list
      tags: z.array(z.enum(BLOG_TAGS)).optional(),
      featured: z.boolean().optional().default(false),
      // We'll use a numeric read time in minutes for stricter handling
      readTimeMinutes: z.number().int().positive().optional(),
      // Use centralized author list
      author: z.union([
        z.enum(BLOG_AUTHORS),
        z.array(z.enum(BLOG_AUTHORS)),
      ]).optional(),
      // Thumbnail must be a path to a local image under `/images/` (discourages external URLs)
      thumbnail: z.string().optional().refine((val) => {
        if (!val) return true;
        return val.startsWith('/images/') || val.startsWith('images/');
      }, { message: 'thumbnail must be a local image path under /images/ (not an external URL)' }),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});
