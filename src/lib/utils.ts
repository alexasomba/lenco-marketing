import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Resolve a blog thumbnail value to a safe, local URL.
 * - If missing, returns a placeholder under `public/images/blog/`.
 * - If it's already a local path (`/images/...`), return as-is.
 * - If it's an external URL, fall back to the placeholder (we don't proxy remote images).
 */
export function getLocalThumbnail(thumbnail?: string): string {
  const placeholder = "/images/blog/placeholder.png"

  if (!thumbnail) return placeholder
  if (thumbnail.startsWith("/")) return thumbnail

  // External URLs (http/https) are not guaranteed to exist locally.
  if (/^https?:\/\//i.test(thumbnail)) return placeholder

  // Treat any other relative-looking value as a local path.
  return `/${thumbnail.replace(/^\.\/?/, "")}`
}
