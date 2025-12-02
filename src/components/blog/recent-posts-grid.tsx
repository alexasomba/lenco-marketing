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
    <div className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Recent Posts
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Stay up to date with the latest articles</p>
          </div>
          <Link
            to="/blog"
            search={{ tag: 'All' }}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
          >
            View all articles
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Large posts column */}
          <div className="lg:col-span-2 space-y-8">
            {largePosts.map((post) => (
              <Link key={post.url} to={post.url} className="group block">
                <article className="grid md:grid-cols-2 gap-6 items-center p-4 -m-4 rounded-2xl hover:bg-accent/50 transition-colors">
                  {/* Thumbnail */}
                  <div className="relative aspect-16/10 rounded-xl overflow-hidden shadow-sm ring-1 ring-border/50 group-hover:shadow-md transition-shadow">
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
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-background/90 backdrop-blur-sm text-foreground rounded-full shadow-sm">
                          {post.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    
                    {post.description && (
                      <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                        {post.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium">{post.date}</span>
                      {post.author && (
                        <>
                          <span className="opacity-50">•</span>
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
          <div className="space-y-1 bg-muted/50 rounded-2xl p-4">
            <h4 className="text-sm font-semibold text-muted-foreground mb-4 px-2">More Articles</h4>
            {smallPosts.map((post) => (
              <Link key={post.url} to={post.url} className="group flex gap-4 p-2 rounded-xl hover:bg-background transition-colors">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden ring-1 ring-border/50">
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
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1.5">
                    <span>{post.date}</span>
                    {post.tags && post.tags.length > 0 && (
                      <>
                        <span className="opacity-50">•</span>
                        <span>{post.tags[0]}</span>
                      </>
                    )}
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
