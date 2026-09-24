import type { MetadataRoute } from 'next'
import { profile } from '@/content/profile'

// Case study routes are appended here when they ship.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${profile.siteUrl}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }]
}
