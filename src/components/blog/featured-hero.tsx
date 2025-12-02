import { Link } from '@tanstack/react-router';

interface FeaturedHeroProps {
  post: {
    url: string;
    title: string;
    description?: string;
    date: string;
    author?: string;
    thumbnail?: string;
    tags?: string[];
  };
}

export function FeaturedHero({ post }: FeaturedHeroProps) {
  return (
    <div className="py-10 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
          Featured Posts
        </h3>
        
        <Link to={post.url} className="group block">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden">
              {post.thumbnail ? (
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col gap-4">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {post.title}
              </h2>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{post.date}</span>
                {post.author && (
                  <>
                    <span>—</span>
                    <span>{post.author}</span>
                  </>
                )}
              </div>
              
              {post.description && (
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed line-clamp-4">
                  {post.description}
                </p>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
