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
    <div className="py-16 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Learn and grow with our best resources
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to master business banking and grow your company.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((resource) => {
            const Icon = iconMap[resource.icon];
            return (
              <Link
                key={resource.title}
                to={resource.href}
                className="group relative block rounded-2xl overflow-hidden border border-border bg-card hover:bg-accent transition-colors"
              >
                {/* Content */}
                <div className="relative p-6 h-full min-h-[200px] flex flex-col justify-between">
                  {resource.badge && (
                    <span className="inline-flex self-start px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground rounded-full mb-4">
                      {resource.badge}
                    </span>
                  )}
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-card-foreground group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {resource.description}
                    </p>
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
