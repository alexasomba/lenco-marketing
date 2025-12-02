'use client';

import { Link } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface TrendingTagsProps {
  tags: string[];
}

const tagDescriptions: Record<string, { description: string; color: string }> = {
  'Business Banking': {
    description: 'Everything you need to know about managing your business finances, opening accounts, and banking solutions.',
    color: 'bg-white',
  },
  'Getting Started': {
    description: 'Step-by-step guides to help you get up and running with Lenco business banking quickly.',
    color: 'bg-yellow-400',
  },
  'Finance Tips': {
    description: 'Expert advice on managing cash flow, budgeting, and making smart financial decisions for your business.',
    color: 'bg-pink-400',
  },
  'Guide': {
    description: 'Comprehensive tutorials and walkthroughs for mastering business finance management.',
    color: 'bg-purple-400',
  },
  'Nigeria': {
    description: 'Insights specific to doing business and banking in Nigeria.',
    color: 'bg-green-400',
  },
  'Cash Flow': {
    description: 'Learn how to optimize your cash flow and keep your business financially healthy.',
    color: 'bg-blue-400',
  },
  'Small Business': {
    description: 'Resources and tips specifically designed for small business owners and entrepreneurs.',
    color: 'bg-orange-400',
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
    <div className="py-8 px-6 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Trending Tags
          </h3>
          <div className="flex gap-1">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-1.5 rounded-full bg-muted text-foreground disabled:opacity-30 hover:bg-accent transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="p-1.5 rounded-full bg-muted text-foreground disabled:opacity-30 hover:bg-accent transition-colors"
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
                color: 'bg-gray-400',
              };
              
              return (
                <div
                  key={tag}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 px-1"
                >
                  <div className={`${tagInfo.color} text-black rounded-xl p-5 h-full min-h-[180px] flex flex-col justify-between`}>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{tag}</h4>
                      <p className="text-sm text-black/70 line-clamp-3">
                        {tagInfo.description}
                      </p>
                    </div>
                    <Link
                      to="/blog"
                      search={{ tag }}
                      className="inline-flex items-center gap-1 text-sm font-semibold mt-4 group"
                    >
                      View Posts
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
