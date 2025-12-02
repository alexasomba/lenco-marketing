import { createFileRoute, notFound } from '@tanstack/react-router';
import { source } from '@/lib/source';
import { getLLMText } from '@/lib/get-llm-text';

export const Route = createFileRoute('/docs.mdx/$')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slugs = params._splat?.split('/') ?? [];
        const page = source.getPage(slugs);
        if (!page) throw notFound();

        // Return the processed MDX content for LLM/copy operations.
        return new Response(await getLLMText(page), {
          headers: {
            'Content-Type': 'text/markdown',
          },
        });
      },
    },
  },
});
