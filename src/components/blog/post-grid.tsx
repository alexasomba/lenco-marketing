import { Link } from '@tanstack/react-router';

interface Post {
  url: string;
  title: string;
  description?: string;
  date: string;
  author?: string;
  thumbnail?: string;
  tags?: string[];
}

interface PostGridProps {
  posts: Post[];
  title?: string;
  columns?: 3 | 4;
}

export function PostGrid({ posts, title, columns = 3 }: PostGridProps) {
  if (posts.length === 0) return null;

  return (
    <div className="py-10 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {title && (
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
            {title}
          </h3>
        )}
        
        <div className={`grid gap-6 ${columns === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {posts.map((post) => (
            <Link key={post.url} to={post.url} className="group block">
              <article className="h-full">
                {/* Thumbnail */}
                <div className="relative aspect-16/10 rounded-xl overflow-hidden mb-4">
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
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
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
      </div>
    </div>
  );
}
