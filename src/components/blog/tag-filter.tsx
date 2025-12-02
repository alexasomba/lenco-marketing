'use client';

import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

interface TagFilterProps {
  tags: string[];
  selectedTag: string;
  tagCounts: Record<string, number>;
}

export function TagFilter({ tags, selectedTag, tagCounts }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          to="/blog"
          search={{ tag }}
          className={cn(
            'px-3 py-1.5 text-sm font-medium rounded-full border transition-colors',
            selectedTag === tag
              ? 'bg-foreground text-background border-foreground'
              : 'bg-background text-muted-foreground border-border hover:border-foreground/50'
          )}
        >
          {tag}
          <span className="ml-1.5 text-xs opacity-60">({tagCounts[tag] || 0})</span>
        </Link>
      ))}
    </div>
  );
}
