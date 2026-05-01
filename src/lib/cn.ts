/**
 * Simple className utility - filters falsy values and joins with space
 * No external dependencies needed (clsx + tailwind-merge not required for this project)
 */
export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
