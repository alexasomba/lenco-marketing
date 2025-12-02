import { createFileRoute, notFound, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { blogSource } from '@/lib/blog-source';
import blogBrowserCollections from 'fumadocs-mdx:collections/browser';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';

export const Route = createFileRoute('/blog/$')({
  component: BlogPostPage,
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
    const page = blogSource.getPage(slugs);
    if (!page) throw notFound();

    return {
      path: page.path,
      title: page.data.title,
      description: page.data.description,
      date: page.data.date,
      tags: page.data.tags,
      readTime: page.data.readTime,
      author: page.data.author,
      thumbnail: page.data.thumbnail,
    };
  });

const clientLoader = blogBrowserCollections.blog.createClientLoader({
  component({ default: MDX }) {
    return (
      <div className="prose prose-lg prose-gray max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-linear-to-b from-slate-50 to-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Blog</span>
          </Link>

          {/* Tags */}
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {data.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {data.title}
          </h1>

          {/* Description */}
          {data.description && (
            <p className="text-lg text-gray-600 mb-6">{data.description}</p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {data.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {data.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(data.date)}
            </span>
            {data.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {data.readTime}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {data.thumbnail && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-xl overflow-hidden">
            <img
              src={data.thumbnail}
              alt={data.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Content />
      </article>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to streamline your business finances?
          </h3>
          <p className="text-gray-600 mb-4">
            Open a Lenco business account in minutes and take control of your finances.
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Get Started Free
          </Button>
        </div>
      </div>
    </div>
  );
}
