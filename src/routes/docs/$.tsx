import { createFileRoute, notFound } from '@tanstack/react-router';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { createServerFn } from '@tanstack/react-start';
import { source } from '@/lib/source';
import { getGithubIssueOwner, getGithubIssueRepo } from '@/lib/site-config';
import { Feedback } from '@/components/feedback';
import type { ActionResponse } from '@/components/feedback';
import { onRateAction } from '@/server/actions/docs-feedback.server';
import type * as PageTree from 'fumadocs-core/page-tree';
import { useMemo } from 'react';
import browserCollections from 'fumadocs-mdx:collections/browser';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { LLMCopyButton, ViewOptions } from '@/components/page-actions';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { baseOptions, sidebarTabIcons } from '@/lib/layout.shared';

export const Route = createFileRoute('/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});

const serverLoader = createServerFn({
  method: 'GET',
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    try {
      const page = source.getPage(slugs);
      if (!page) throw notFound();

      return {
        tree: source.pageTree as object,
        path: page.path,
        // Page metadata for SEO
        title: page.data.title,
        description: page.data.description,
        // Expose the page url so client components can derive things like
        // markdown links and copy actions without re-resolving the source.
        url: page.url,
        // Make owner/repo available for things like "View on GitHub".
        owner: getGithubIssueOwner(),
        repo: getGithubIssueRepo(),
      };
    } catch (error) {
      // Re-throw notFound errors as-is
      if (error && typeof error === 'object' && 'notFound' in error) {
        throw error;
      }
      // Log unexpected errors and throw a generic error
      console.error('Error loading docs page:', error);
      throw notFound();
    }
  });

const clientLoader = browserCollections.docs.createClientLoader({
  // The `component` receives two args: the loaded doc content and any props
  // forwarded when `Content` is rendered on the page. Use the props to show
  // copy / view actions when passed through from the server-side `Page` loader.
  component({ toc, frontmatter, default: MDX }, props: any) {
    const { page } = props ?? {};
    return (
      <DocsPage toc={toc}>
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        {/* Top-of-article actions: copy markdown and view on Github */}
        {page?.markdownUrl && (
          <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
            <LLMCopyButton markdownUrl={page.markdownUrl} />
            {page.githubUrl && (
              <ViewOptions
                markdownUrl={page.markdownUrl}
                githubUrl={page.githubUrl}
              />
            )}
          </div>
        )}
        {/* Article content */}
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
            }}
            // Forward the page object into the MDX component so MDX content can
            // access page.markdownUrl, page.githubUrl, etc (consistent with
            // the upstream example). This enables MDX authors to render
            // LLMCopyButton and ViewOptions directly inside MDX files.
            page={page}
          />
          {/* Feedback UI — uses a server function (onRateAction) to submit feedback. */}
          <div className="mt-6">
            <Feedback
              onRateAction={(url, fb) =>
                onRateAction({ data: { url, feedback: fb } }) as Promise<ActionResponse>
              }
            />
          </div>
        </DocsBody>
      </DocsPage>
    );
  },
});

// Core logic for creating feedback issues. Exported for testability.
export interface FeedbackInput {
  url: string;
  feedback: { opinion: 'good' | 'bad'; message: string };
}

// Server action wrapper that delegates to handleCreateFeedback.
// the server wrapper used by the client is implemented in
// src/server/actions/docs-feedback.server.ts and imported above.

function Page() {
  const data = Route.useLoaderData();
  const Content = clientLoader.getComponent(data.path);
  const tree = useMemo(
    () => transformPageTree(data.tree as PageTree.Folder),
    [data.tree],
  );

  const pageObj = {
    url: data.url,
    path: data.path,
    // preferred helper fields for client components
    // Use page.url + '.mdx' pattern. The middleware in start.ts rewrites
    // /docs/<path>.mdx → /docs.mdx/<path> to serve raw MDX content.
    markdownUrl: `${data.url}.mdx`,
    // GitHub URLs point to content/docs/ in the repo root (not apps/docs/)
    githubUrl: `https://github.com/${data.owner}/${data.repo}/blob/main/content/docs/${data.path}`,
    editUrl: `https://github.com/${data.owner}/${data.repo}/edit/main/content/docs/${data.path}`,
    owner: data.owner,
    repo: data.repo,
  };

  return (
    <DocsLayout
      {...baseOptions()}
      tree={tree}
      sidebar={{
        tabs: {
          transform: (option, _node) => ({
            ...option,
            icon: sidebarTabIcons[option.title as keyof typeof sidebarTabIcons] || option.icon,
          }),
        },
      }}
    >
      <Content page={pageObj} owner={data.owner} repo={data.repo} />
    </DocsLayout>
  );
}

function transformPageTree(root: PageTree.Root): PageTree.Root {
  function mapNode<T extends PageTree.Node>(item: T): T {
    if (typeof item.icon === 'string') {
      item = {
        ...item,
        icon: (
          <span
            dangerouslySetInnerHTML={{
              __html: item.icon,
            }}
          />
        ),
      };
    }

    if (item.type === 'folder') {
      return {
        ...item,
        index: item.index ? mapNode(item.index) : undefined,
        children: item.children.map(mapNode),
      };
    }

    return item;
  }

  return {
    ...root,
    children: root.children.map(mapNode),
    fallback: root.fallback ? transformPageTree(root.fallback) : undefined,
  };
}