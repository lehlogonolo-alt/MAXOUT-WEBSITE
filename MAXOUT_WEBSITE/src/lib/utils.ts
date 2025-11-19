// src/lib/utils.ts

/**
 * Merge class names conditionally.
 * Filters out falsy values and joins into a single string.
 * Example:
 * cn("base", condition && "highlight", "extra")
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Capitalize the first letter of a string.
 * Example: capitalize("maxout") -> "Maxout"
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format numbers with commas for readability.
 * Example: formatNumber(12345) -> "12,345"
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat().format(num);
}
