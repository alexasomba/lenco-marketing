import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { blogSource } from '@/lib/blog-source';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const Route = createFileRoute('/blog/')({
  component: BlogIndexPage,
  loader: async () => {
    return await serverLoader();
  },
});

interface BlogPageData {
  url: string;
  title: string;
  description?: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  thumbnail?: string;
}

const serverLoader = createServerFn({
  method: 'GET',
}).handler(async () => {
  const pages = blogSource.getPages();

  const blogPages: BlogPageData[] = pages.map((page) => ({
    url: page.url,
    title: page.data.title,
    description: page.data.description,
    date: page.data.date,
    tags: page.data.tags,
    featured: page.data.featured,
    readTime: page.data.readTime,
    author: page.data.author,
    thumbnail: page.data.thumbnail,
  }));

  // Sort by date, newest first
  blogPages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { posts: blogPages };
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function BlogIndexPage() {
  const { posts } = Route.useLoaderData();

  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = posts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Lenco Blog
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Insights, tips, and updates on business finance, payments, and growing your business in Nigeria.
          </p>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <FeaturedBlogCard key={post.url} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">All Articles</h2>
          {posts.length === 0 ? (
            <p className="text-gray-500 text-center py-12">No blog posts yet. Check back soon!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(featuredPosts.length > 0 ? regularPosts : posts).map((post) => (
                <BlogCard key={post.url} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function FeaturedBlogCard({ post }: { post: BlogPageData }) {
  return (
    <Link to={post.url} className="group block">
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {post.thumbnail && (
          <div className="relative h-64 overflow-hidden bg-slate-100">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-6">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.description}</p>
          )}
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              {post.readTime && (
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </span>
              )}
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function BlogCard({ post }: { post: BlogPageData }) {
  return (
    <Link to={post.url} className="group block">
      <Card className="overflow-hidden border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        {post.thumbnail && (
          <div className="relative h-48 overflow-hidden bg-slate-100">
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardContent className="p-5">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.description}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.date)}
            </span>
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
