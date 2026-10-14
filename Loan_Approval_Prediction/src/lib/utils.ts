import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number as Indian Rupee currency.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a decimal as a percentage string.
 */
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

/**
 * Format a date string to a readable format.
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Generate a unique application ID.
 */
export function generateApplicationId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `LP-${year}-${num}`;
}
