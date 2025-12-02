'use client';

import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface TrendingTagsProps {
  tags: string[];
}

const tagDescriptions: Record<string, { description: string; colorClass: string }> = {
  'Business Banking': {
    description: 'Everything you need to know about managing your business finances, opening accounts, and banking solutions.',
    colorClass: 'bg-card border-border',
  },
  'Getting Started': {
    description: 'Step-by-step guides to help you get up and running with Lenco business banking quickly.',
    colorClass: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700/50',
  },
  'Finance Tips': {
    description: 'Expert advice on managing cash flow, budgeting, and making smart financial decisions for your business.',
    colorClass: 'bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-700/50',
  },
  'Guide': {
    description: 'Comprehensive tutorials and walkthroughs for mastering business finance management.',
    colorClass: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700/50',
  },
  'Nigeria': {
    description: 'Insights specific to doing business and banking in Nigeria.',
    colorClass: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-700/50',
  },
  'Cash Flow': {
    description: 'Learn how to optimize your cash flow and keep your business financially healthy.',
    colorClass: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700/50',
  },
  'Small Business': {
    description: 'Resources and tips specifically designed for small business owners and entrepreneurs.',
    colorClass: 'bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-700/50',
  },
};

export function TrendingTags({ tags }: TrendingTagsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTags = 4;
  const maxIndex = Math.max(0, tags.length - visibleTags);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (tags.length <= 1) return null;

  // Filter out 'All' tag
  const displayTags = tags.filter((tag) => tag !== 'All');

  return (
    <div className="py-12 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Explore Topics
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Browse articles by category</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-background border border-border text-foreground disabled:opacity-30 hover:bg-accent shadow-sm transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="p-2 rounded-full bg-background border border-border text-foreground disabled:opacity-30 hover:bg-accent shadow-sm transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-4 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleTags)}%)` }}
          >
            {displayTags.map((tag) => {
              const tagInfo = tagDescriptions[tag] || {
                description: `Explore articles about ${tag.toLowerCase()}.`,
                colorClass: 'bg-muted border-border',
              };
              
              return (
                <div
                  key={tag}
                  className="shrink-0 w-full sm:w-1/2 lg:w-1/4 px-1"
                >
                  <Link
                    to="/blog/all"
                    search={{ tag, page: 1 }}
                    className="group block"
                  >
                    <div className={`${tagInfo.colorClass} border rounded-2xl p-6 h-full min-h-[200px] flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                      <div>
                        <h4 className="font-bold text-xl mb-3 text-foreground">{tag}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                          {tagInfo.description}
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm font-semibold mt-4 text-primary">
                        View Posts
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
