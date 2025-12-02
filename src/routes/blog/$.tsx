import { createFileRoute, notFound, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { blogSource } from '@/lib/blog-source';
import blogBrowserCollections from 'fumadocs-mdx:collections/browser';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { AuthorCard } from '@/components/blog/author-card';
import { PromoContent } from '@/components/blog/promo-content';
import { MobileTableOfContents } from '@/components/blog/mobile-toc';
import { ReadMoreSection } from '@/components/blog/read-more-section';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/blog/$')({
  component: BlogPostPage,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});

interface BlogPageData {
  url: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  thumbnail?: string;
}

const serverLoader = createServerFn({
  method: 'GET',
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = blogSource.getPage(slugs);
    if (!page) throw notFound();

    // Get all posts for the "Read More" section
    const allPages = blogSource.getPages();
    const allPosts: BlogPageData[] = allPages.map((p) => ({
      url: p.url,
      title: p.data.title,
      description: p.data.description,
      date: p.data.date,
      tags: p.data.tags,
      thumbnail: p.data.thumbnail,
    }));

    return {
      path: page.path,
      slug: slugs.join('/'),
      title: page.data.title,
      description: page.data.description,
      date: page.data.date,
      tags: page.data.tags,
      readTime: page.data.readTime,
      author: page.data.author,
      thumbnail: page.data.thumbnail,
      allPosts,
    };
  });

const clientLoader = blogBrowserCollections.blog.createClientLoader({
  component({ default: MDX }) {
    return (
      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
        <MDX
          components={{
            ...defaultMdxComponents,
          }}
        />
      </div>
    );
  },
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BlogPostPage() {
  const data = Route.useLoaderData();
  const Content = clientLoader.getComponent(data.path);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Flickering Grid Background */}
      <div className="absolute top-0 left-0 z-0 w-full h-[300px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 p-6">
          {/* Back button & Tags */}
          <div className="flex flex-wrap items-center gap-3 gap-y-5 text-sm text-muted-foreground">
            <Button variant="outline" asChild className="h-6 w-6 p-0">
              <Link to="/blog" search={{ tag: 'All' }}>
                <ArrowLeft className="w-4 h-4" />
                <span className="sr-only">Back to all articles</span>
              </Link>
            </Button>
            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-3 text-muted-foreground">
                {data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="h-6 w-fit px-3 text-sm font-medium bg-muted text-muted-foreground rounded-md border flex items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tighter text-foreground max-w-4xl">
            {data.title}
          </h1>

          {/* Description */}
          {data.description && (
            <p className="text-lg text-muted-foreground max-w-3xl">
              {data.description}
            </p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {data.author && (
              <span className="flex items-center gap-2 font-medium text-foreground">
                {data.author}
              </span>
            )}
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(data.date)}</span>
            </span>
            {data.readTime && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{data.readTime}</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="max-w-7xl mx-auto flex">
        {/* Article Content */}
        <main className="flex-1 min-w-0">
          {/* Featured Image */}
          {data.thumbnail && (
            <div className="p-6">
              <div className="rounded-lg overflow-hidden border border-border">
                <img
                  src={data.thumbnail}
                  alt={data.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <article className="p-6 lg:p-10">
            <Content />
          </article>
        </main>

        {/* Sidebar - Desktop Only */}
        <aside className="hidden lg:block w-[350px] flex-shrink-0 p-6 lg:p-10 bg-muted/60 dark:bg-muted/20">
          <div className="sticky top-20 space-y-8">
            {/* Author Card */}
            {data.author && (
              <AuthorCard 
                name={data.author} 
                position="Author"
              />
            )}

            {/* Table of Contents */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <TableOfContents />
            </div>

            {/* Promo Content */}
            <PromoContent variant="desktop" />
          </div>
        </aside>
      </div>

      {/* Read More Section */}
      <ReadMoreSection
        currentSlug={data.slug}
        currentTags={data.tags}
        posts={data.allPosts}
      />

      {/* Mobile Table of Contents */}
      <MobileTableOfContents />
    </div>
  );
}
