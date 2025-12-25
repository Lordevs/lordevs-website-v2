/**
 * Utility functions for admin operations
 * Provides reusable helpers for common admin tasks
 */

/**
 * Format a number with proper pluralization
 */
export function formatCount(
  count: number,
  singular: string,
  plural?: string
): string {
  if (count === 1) return `${count} ${singular}`;
  return `${count} ${plural || singular + "s"}`;
}

/**
 * Calculate percentage with optional decimal places
 */
export function calculatePercentage(
  value: number,
  total: number,
  decimals = 1
): number {
  if (total === 0) return 0;
  return Number(((value / total) * 100).toFixed(decimals));
}

/**
 * Generate a unique order index for new items
 */
export function generateOrderIndex(
  existingItems: Array<{ order_index: number }>
): number {
  if (existingItems.length === 0) return 1;
  const maxIndex = Math.max(...existingItems.map((item) => item.order_index));
  return maxIndex + 1;
}

/**
 * Validate if a string is a valid URL
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Debounce function for search inputs
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: unknown[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

/**
 * Format date for display in admin interface
 */
export function formatAdminDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

/**
 * Sort items by order_index
 */
export function sortByOrderIndex<T extends { order_index: number }>(
  items: T[]
): T[] {
  return [...items].sort((a, b) => a.order_index - b.order_index);
}

/**
 * Generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
