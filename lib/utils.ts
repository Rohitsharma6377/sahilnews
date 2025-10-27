import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
