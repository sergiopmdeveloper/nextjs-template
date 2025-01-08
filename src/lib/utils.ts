import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Joins class names using `twMerge` and `clsx`.
 * @param {ClassValue[]} inputs - Class names to join.
 * @returns {string} - Joined class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
