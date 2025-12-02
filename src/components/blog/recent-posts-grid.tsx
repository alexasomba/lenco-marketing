import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

interface Post {
  url: string;
  title: string;
  description?: string;
  date: string;
  author?: string;
  thumbnail?: string;
  tags?: string[];
}

interface RecentPostsGridProps {
  posts: Post[];
}

export function RecentPostsGrid({ posts }: RecentPostsGridProps) {
  if (posts.length === 0) return null;

  // Split posts: first 2 are large, rest are in a smaller grid
  const largePosts = posts.slice(0, 2);
  const smallPosts = posts.slice(2, 8);

  return (
    <div className="py-10 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent Posts
          </h3>
          <Link
            to="/blog"
            search={{ tag: 'All' }}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors group"
          >
            View all
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large posts column */}
          <div className="lg:col-span-2 space-y-6">
            {largePosts.map((post) => (
              <Link key={post.url} to={post.url} className="group block">
                <article className="grid md:grid-cols-2 gap-4 items-center">
                  {/* Thumbnail */}
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden">
                    {post.thumbnail ? (
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted" />
                    )}
                    
                    {/* Tag badge */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                          {post.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    
                    {post.description && (
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {post.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{post.date}</span>
                      {post.author && (
                        <>
                          <span>—</span>
                          <span>{post.author}</span>
                        </>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Small posts column */}
          <div className="space-y-4">
            {smallPosts.map((post) => (
              <Link key={post.url} to={post.url} className="group flex gap-4">
                {/* Thumbnail */}
                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden">
                  {post.thumbnail ? (
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted" />
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 space-y-1">
                  {post.tags && post.tags.length > 0 && (
                    <span className="inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full">
                      {post.tags[0]}
                    </span>
                  )}
                  <h3 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <div className="text-xs text-muted-foreground">
                    {post.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
