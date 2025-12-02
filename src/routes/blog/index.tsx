import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { blogSource } from '@/lib/blog-source';
import { FeaturedSlider } from '@/components/blog/featured-slider';
import { NewsletterSection } from '@/components/blog/newsletter-section';
import { TrendingTags } from '@/components/blog/trending-tags';
import { FeaturedHero } from '@/components/blog/featured-hero';
import { PostGrid } from '@/components/blog/post-grid';
import { ResourcesSection } from '@/components/blog/resources-section';
import { RecentPostsGrid } from '@/components/blog/recent-posts-grid';
import { Button } from '@/components/ui/button';
import { getAuthors } from '@/lib/authors';
import { ArrowRight } from 'lucide-react';

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
  readTimeMinutes?: number;
  author?: string | { name: string; avatar?: string; position?: string } | Array<{ name: string; avatar?: string; position?: string } | string>;
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
    readTimeMinutes: page.data.readTimeMinutes,
    // Resolve author alias(es) into author objects (single object or array)
    author: (() => {
      const resolved = getAuthors(page.data.author as any);
      return resolved.length === 1 ? resolved[0] : resolved;
    })(),
    thumbnail: page.data.thumbnail,
  }));

  // Sort by date, newest first
  blogPages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get all unique tags
  const allTags = [
    'All',
    ...Array.from(
      new Set(blogPages.flatMap((blog) => blog.tags || []))
    ).sort(),
  ];

  // Calculate tag counts
  const tagCounts = allTags.reduce((acc, tag) => {
    if (tag === 'All') {
      acc[tag] = blogPages.length;
    } else {
      acc[tag] = blogPages.filter((blog) => blog.tags?.includes(tag)).length;
    }
    return acc;
  }, {} as Record<string, number>);

  // Get featured posts
  const featuredPosts = blogPages.filter((post) => post.featured);

  return { posts: blogPages, allTags, tagCounts, featuredPosts };
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function BlogIndexPage() {
  const { posts, allTags, featuredPosts } = Route.useLoaderData();

  // Format dates for display
  const formattedPosts = posts.map((post) => ({
    ...post,
    date: formatDate(post.date),
  }));

  const formattedFeaturedPosts = featuredPosts.map((post) => ({
    ...post,
    date: formatDate(post.date),
  }));

  // Get the main featured post (most recent featured)
  const mainFeaturedPost = formattedFeaturedPosts[0]
    ? {
        ...formattedFeaturedPosts[0],
        author: typeof formattedFeaturedPosts[0].author === 'string'
          ? formattedFeaturedPosts[0].author
          : Array.isArray(formattedFeaturedPosts[0].author)
          ? formattedFeaturedPosts[0].author.map((a) => (typeof a === 'string' ? a : a.name)).join(', ')
          : formattedFeaturedPosts[0].author?.name,
      }
    : undefined;

  // Get posts for different sections (ensure author is string for UI components)
  const authorToString = (author?: any) =>
    typeof author === 'string' ? author : Array.isArray(author) ? author.map((a) => (typeof a === 'string' ? a : a.name)).join(', ') : author?.name;

  const sliderPosts = formattedPosts.slice(0, 8).map((p) => ({ ...p, author: authorToString(p.author) }));
  const gridPosts = formattedPosts.slice(0, 4).map((p) => ({ ...p, author: authorToString(p.author) }));
  const recentPosts = formattedPosts.slice(0, 6).map((p) => ({ ...p, author: authorToString(p.author) }));

  return (
    <div className="min-h-screen bg-background">
      {/* Featured posts slider */}
      <div className="border-b border-border py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <FeaturedSlider posts={sliderPosts} />
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Trending Tags */}
      <TrendingTags tags={allTags} />

      {/* Featured Hero Post */}
      {mainFeaturedPost && <FeaturedHero post={mainFeaturedPost} />}

      {/* Regular post grid */}
      <PostGrid posts={gridPosts} columns={4} />

      {/* Resources Section */}
      <ResourcesSection />

      {/* Recent Posts */}
      <RecentPostsGrid posts={recentPosts} />

      {/* More Articles Button */}
      {formattedPosts.length > 6 && (
        <div className="py-10 px-6 bg-background text-center">
          <Link to="/blog/all" search={{ tag: 'All', page: 1 }}>
            <Button variant="outline" className="px-8 gap-2">
              More Articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
