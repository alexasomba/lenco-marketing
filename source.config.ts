import { defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
});

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      // Date must follow exact YYYY-MM-DD (ISO date without time) to keep frontmatter consistent
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
      // Allowed tag set — make this strict so frontmatter must use canonical tags
      tags: z.array(z.enum([
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
      ])).optional(),
      featured: z.boolean().optional().default(false),
      // We'll use a numeric read time in minutes for stricter handling
      readTimeMinutes: z.number().int().positive().optional(),
      // Authors are stored as aliases in frontmatter; the app will resolve alias -> author object
      author: z.union([
        z.enum(['alex-asomba', 'lenco-team']),
        z.array(z.enum(['alex-asomba', 'lenco-team'])),
      ]).optional(),
      // Thumbnail must be a path to a local image under `/images/` (discourages external URLs)
      thumbnail: z.string().optional().refine((val) => {
        if (!val) return true;
        return val.startsWith('/images/') || val.startsWith('images/');
      }, { message: 'thumbnail must be a local image path under /images/ (not an external URL)' }),
    }),
  },
});
