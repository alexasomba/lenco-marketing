import { createFileRoute, Link } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { blogSource } from '@/lib/blog-source';
import { FeaturedSlider } from '@/components/blog/featured-slider';
import { getLocalThumbnail } from '@/lib/utils';
import { NewsletterSection } from '@/components/blog/newsletter-section';
import { TrendingTags } from '@/components/blog/trending-tags';
import { FeaturedHero } from '@/components/blog/featured-hero';
import { PostGrid } from '@/components/blog/post-grid';
import { ResourcesSection } from '@/components/blog/resources-section';
import { RecentPostsGrid } from '@/components/blog/recent-posts-grid';
import { Button } from '@/components/ui/button';
import { getAuthors } from '@/lib/authors';

export const Route = createFileRoute('/blog/')({
  component: BlogIndexPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tag: (search.tag as string) || 'All',
    };
  },
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
  const { tag: selectedTag } = Route.useSearch();

  // Format dates for display
  const formattedPosts = posts.map((post) => ({
    ...post,
    date: formatDate(post.date),
  }));

  const formattedFeaturedPosts = featuredPosts.map((post) => ({
    ...post,
    date: formatDate(post.date),
  }));

  // Filter posts if tag is selected
  const filteredPosts = selectedTag === 'All'
    ? formattedPosts
    : formattedPosts.filter((post) => post.tags?.includes(selectedTag));

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
  const gridPosts = filteredPosts.slice(0, 4).map((p) => ({ ...p, author: authorToString(p.author) }));
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

      {/* Post Grid with tag filter indicator */}
      {selectedTag !== 'All' ? (
        <div className="py-10 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Posts tagged with
                </h3>
                <span className="px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded-full">
                  {selectedTag}
                </span>
              </div>
              <Link to="/blog" search={{ tag: 'All' }}>
                <Button variant="outline" size="sm">
                  Clear filter
                </Button>
              </Link>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">No posts found with this tag.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <Link key={post.url} to={post.url} className="group block">
                    <article className="h-full">
                      <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-4">
                        {
                          <img
                            src={getLocalThumbnail(post.thumbnail)}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        }
                        {post.tags && post.tags.length > 0 && (
                          <div className="absolute bottom-3 left-3">
                            <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                              {post.tags[0]}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{post.date}</span>
                          {post.author && (
                            <>
                              <span>—</span>
                              <span>
                                {typeof post.author === 'string'
                                  ? post.author
                                  : Array.isArray(post.author)
                                  ? post.author.map((a) => (typeof a === 'string' ? a : a.name)).join(', ')
                                  : post.author.name}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <>
          {/* Regular post grid */}
          <PostGrid posts={gridPosts} columns={4} />

          {/* Resources Section */}
          <ResourcesSection />

          {/* Recent Posts */}
          <RecentPostsGrid posts={recentPosts} />
        </>
      )}

      {/* Load More Button */}
      {filteredPosts.length > 6 && (
        <div className="py-10 px-6 bg-background text-center">
          <Button variant="outline" className="px-8">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
