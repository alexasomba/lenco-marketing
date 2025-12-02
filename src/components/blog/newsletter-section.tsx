'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="bg-muted py-12 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
          Dive into top stories, trends, and gems you'll love. Subscribe!
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-3 mt-6 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="flex-1 h-12 px-4 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={status === 'loading'}
          />
          <Button
            type="submit"
            disabled={status === 'loading' || !email}
            className="h-12 px-8 rounded-lg"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
          </Button>
        </form>
        {status === 'success' && (
          <p className="text-green-600 dark:text-green-400 text-sm mt-3">Thanks for subscribing! Check your inbox.</p>
        )}
      </div>
    </div>
  );
}
