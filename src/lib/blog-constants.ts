// Centralized author and tag lists for type safety and reusability
export const BLOG_AUTHORS = ['alex-asomba', 'lenco-team'] as const;
export const BLOG_TAGS = [
  'Getting Started',
  'Business',
  'Nigeria',
  'API',
  'Business Banking',
  'Guide',
  'Cash Flow',
  'Finance Tips',
  'Small Business',
  'Tips',
  'Finance',
  'Zambia',
] as const;

export type BlogAuthor = (typeof BLOG_AUTHORS)[number];
export type BlogTag = (typeof BLOG_TAGS)[number];
