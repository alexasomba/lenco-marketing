import { describe, expect, test, vi } from 'vitest';

// Mock the blogSource so the test doesn't need fumadocs runtime during unit tests
vi.mock('@/lib/blog-source', () => ({
  blogSource: {
    getPages: () => [
      {
        url: '/blog/test-article',
        data: {
          title: 'Test Article',
          description: 'A test article',
          date: '2025-12-01',
          author: 'lenco-team',
          thumbnail: '/images/blog/test.jpg',
        },
      },
    ],
  },
}));

import { getBlogRSS } from '@/lib/rss';

describe('RSS feed', () => {
  test('getBlogRSS returns valid RSS xml', () => {
    const xml = getBlogRSS();
    expect(typeof xml).toBe('string');
    expect(xml.includes('<rss') || xml.includes('<feed')).toBe(true);
    expect(xml.includes('Test Article')).toBe(true);
  });
});
