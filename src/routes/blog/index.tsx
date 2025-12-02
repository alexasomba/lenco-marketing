import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { blogSource } from '@/lib/blog-source';
import { FlickeringGrid } from '@/components/magicui/flickering-grid';
import { BlogCard } from '@/components/blog/blog-card';
import { TagFilter } from '@/components/blog/tag-filter';

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

  return { posts: blogPages, allTags, tagCounts };
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
  const { posts, allTags, tagCounts } = Route.useLoaderData();
  const { tag: selectedTag } = Route.useSearch();

  const filteredPosts = selectedTag === 'All'
    ? posts
    : posts.filter((post) => post.tags?.includes(selectedTag));

  return (
    <div className="min-h-screen bg-background relative">
      {/* Flickering Grid Background */}
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]">
        <FlickeringGrid
          className="absolute top-0 left-0 size-full"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.2}
          flickerChance={0.05}
        />
      </div>

      {/* Header Section */}
      <div className="p-6 border-b border-border flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              Lenco Blog
            </h1>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              Insights, tips, and updates on business finance and growing your business in Nigeria.
            </p>
          </div>
        </div>

        {/* Tag Filter */}
        {allTags.length > 1 && (
          <div className="max-w-7xl mx-auto w-full">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        {filteredPosts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No blog posts found. Check back soon!</p>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
              filteredPosts.length < 4 ? 'border-b' : 'border-b-0'
            }`}
          >
            {filteredPosts.map((post) => (
              <BlogCard
                key={post.url}
                url={post.url}
                title={post.title}
                description={post.description || ''}
                date={formatDate(post.date)}
                thumbnail={post.thumbnail}
                showRightBorder={filteredPosts.length < 3}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
