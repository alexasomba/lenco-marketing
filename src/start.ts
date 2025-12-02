import { createMiddleware, createStart } from '@tanstack/react-start';
import { rewritePath } from 'fumadocs-core/negotiation';
import { redirect } from '@tanstack/react-router';

// Rewrite /docs/<path>.mdx to /docs.mdx/<path> for LLM/copy functionality
const { rewrite: rewriteDocsToMdx } = rewritePath(
  '/docs{/*path}.mdx',
  '/docs.mdx{/*path}',
);

const llmMiddleware = createMiddleware().server(({ next, request }) => {
  const url = new URL(request.url);
  const path = rewriteDocsToMdx(url.pathname);

  if (path) {
    // Use a proper URL redirect so browser/fetch follows to the correct route
    throw redirect({ href: new URL(path, url).toString() });
  }

  return next();
});

export const startInstance = createStart(() => {
  return {
    requestMiddleware: [llmMiddleware],
  };
});