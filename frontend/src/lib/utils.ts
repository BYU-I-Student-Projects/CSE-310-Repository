import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createPageUrl(page: string): string {
  const pageMap: { [key: string]: string } = {
    'Dashboard': '/dashboard',
    'AddLocation': '/add-location',
    'Locations': '/locations',
    'WeatherDetails': '/weather-details',
    'Profile': '/profile',
  }
  
  // Handle URLs with query parameters
  if (page.includes('?')) {
    const [pageName, queryString] = page.split('?')
    const basePath = pageMap[pageName] || `/${pageName.toLowerCase()}`
    return `${basePath}?${queryString}`
  }
  
  return pageMap[page] || `/${page.toLowerCase()}`
}
