import { Link } from '@tanstack/react-router';
import { BookOpen, Video, Headphones, FileText } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  icon: 'book' | 'video' | 'audio' | 'document';
  href: string;
  badge?: string;
}

const resources: Resource[] = [
  {
    title: 'Business Banking Guide',
    description: 'Complete guide to managing your business finances with Lenco.',
    icon: 'book',
    href: '/docs',
    badge: 'Guide',
  },
  {
    title: 'Getting Started Tutorial',
    description: 'Learn how to open your account and make your first transfer.',
    icon: 'video',
    href: '/docs',
    badge: 'Tutorial',
  },
  {
    title: 'Finance Tips Podcast',
    description: 'Expert insights on growing your business in Nigeria.',
    icon: 'audio',
    href: '/blog',
    badge: 'Podcast',
  },
  {
    title: 'API Documentation',
    description: 'Integrate Lenco into your business applications.',
    icon: 'document',
    href: '/docs',
    badge: 'Docs',
  },
];

const iconMap = {
  book: BookOpen,
  video: Video,
  audio: Headphones,
  document: FileText,
};

export function ResourcesSection() {
  return (
    <div className="py-16 px-6 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 tracking-tight">
            Learn and grow with our best resources
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to master business banking and grow your company.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {resources.map((resource) => {
            const Icon = iconMap[resource.icon];
            return (
              <Link
                key={resource.title}
                to={resource.href}
                className="group relative block rounded-2xl overflow-hidden bg-background border border-border shadow-sm hover:shadow-lg hover:border-border/80 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Content */}
                <div className="relative p-6 h-full min-h-[220px] flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    {resource.badge && (
                      <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-muted text-muted-foreground rounded-full">
                        {resource.badge}
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-auto">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {resource.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm text-primary font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
