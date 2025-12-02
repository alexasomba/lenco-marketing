import { defineDocs, frontmatterSchema } from 'fumadocs-mdx/config';
import { z } from 'zod';

export const docs = defineDocs({
  dir: 'content/docs',
});

export const blog = defineDocs({
  dir: 'content/blog',
  docs: {
    schema: frontmatterSchema.extend({
      date: z.string(),
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
      // Strict enum validation for author metadata — keeps the author list canonical
      author: z.union([
        z.enum(['Alex Asomba', 'Lenco Team']),
        z.object({ name: z.enum(['Alex Asomba', 'Lenco Team']), avatar: z.string().regex(/^\/images\/authors\/.+\.(svg|png|jpe?g)$/).optional(), position: z.enum(['Writer', 'Editorial']) }),
        z.array(z.object({ name: z.enum(['Alex Asomba', 'Lenco Team']), avatar: z.string().regex(/^\/images\/authors\/.+\.(svg|png|jpe?g)$/).optional(), position: z.enum(['Writer', 'Editorial']) })),
      ]).optional(),
      thumbnail: z.string().optional(),
    }),
  },
});
