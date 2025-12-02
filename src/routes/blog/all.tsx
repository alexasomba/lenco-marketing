import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { blogSource } from '@/lib/blog-source';
import { getLocalThumbnail, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { getAuthors } from '@/lib/authors';
import { ChevronLeft, ChevronRight, Tag } from 'lucide-react';

export const Route = createFileRoute('/blog/all')({
  component: AllArticlesPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      tag: (search.tag as string) || 'All',
      page: Number(search.page) || 1,
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
    author: (() => {
      const resolved = getAuthors(page.data.author as any);
      return resolved.length === 1 ? resolved[0] : resolved;
    })(),
    thumbnail: page.data.thumbnail,
  }));

  // Sort by date, newest first
  blogPages.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Get all unique tags with counts
  const tagCounts: Record<string, number> = { All: blogPages.length };
  blogPages.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });

  const allTags = ['All', ...Object.keys(tagCounts).filter(t => t !== 'All').sort()];

  return { posts: blogPages, allTags, tagCounts };
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

const POSTS_PER_PAGE = 9;

function AllArticlesPage() {
  const { posts, allTags, tagCounts } = Route.useLoaderData();
  const { tag: selectedTag, page: currentPage } = Route.useSearch();
  const navigate = useNavigate();

  // Format dates for display
  const formattedPosts = posts.map((post) => ({
    ...post,
    date: formatDate(post.date),
  }));

  // Filter posts by tag
  const filteredPosts = selectedTag === 'All'
    ? formattedPosts
    : formattedPosts.filter((post) => post.tags?.includes(selectedTag));

  // Pagination
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // Helper for author display
  const authorToString = (author?: any) =>
    typeof author === 'string' 
      ? author 
      : Array.isArray(author) 
        ? author.map((a) => (typeof a === 'string' ? a : a.name)).join(', ') 
        : author?.name;

  const handleTagChange = (tag: string) => {
    navigate({
      to: '/blog/all',
      search: { tag, page: 1 },
    });
  };

  const handlePageChange = (page: number) => {
    navigate({
      to: '/blog/all',
      search: { tag: selectedTag, page },
    });
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">All Articles</h1>
          <p className="text-muted-foreground mt-2">
            Browse all {totalPosts} article{totalPosts !== 1 ? 's' : ''}
            {selectedTag !== 'All' && ` tagged with "${selectedTag}"`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-4 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-muted/50 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <h3 className="font-semibold text-foreground">Filter by Tag</h3>
                </div>
                <div className="space-y-1">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagChange(tag)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                        selectedTag === tag
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:bg-background hover:text-foreground"
                      )}
                    >
                      <span>{tag}</span>
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full",
                        selectedTag === tag
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}>
                        {tagCounts[tag] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {paginatedPosts.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">No posts found with this tag.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => handleTagChange('All')}
                >
                  View all posts
                </Button>
              </div>
            ) : (
              <>
                {/* Posts Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedPosts.map((post) => (
                    <Link key={post.url} to={post.url} className="group block">
                      <article className="h-full flex flex-col">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4">
                          <img
                            src={getLocalThumbnail(post.thumbnail)}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          {post.tags && post.tags.length > 0 && (
                            <div className="absolute bottom-3 left-3">
                              <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-background/90 backdrop-blur-sm text-foreground rounded-full">
                                {post.tags[0]}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 flex flex-col">
                          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                            {post.title}
                          </h3>
                          {post.description && (
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                              {post.description}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{post.date}</span>
                            {post.author && (
                              <>
                                <span>•</span>
                                <span>{authorToString(post.author)}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage <= 1}
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-1 mx-4">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={cn(
                            "w-9 h-9 rounded-lg text-sm font-medium transition-colors",
                            page === currentPage
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage >= totalPages}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                )}

                {/* Page info */}
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Showing {startIndex + 1}–{Math.min(startIndex + POSTS_PER_PAGE, totalPosts)} of {totalPosts} articles
                </p>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
