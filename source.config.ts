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
      tags: z.array(z.string()).optional(),
      featured: z.boolean().optional().default(false),
      readTime: z.string().optional(),
      author: z.union([
        z.string(),
        z.object({ name: z.string(), avatar: z.string().optional(), position: z.string().optional() }),
        z.array(z.object({ name: z.string(), avatar: z.string().optional(), position: z.string().optional() })),
      ]).optional(),
      thumbnail: z.string().optional(),
    }),
  },
});
