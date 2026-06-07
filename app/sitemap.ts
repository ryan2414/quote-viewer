import type { MetadataRoute } from 'next';
import { quotes } from '@/data/quotes';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://quote-viewer.vercel.app').replace(/\/$/, '');

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/quotes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scriptures`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const quoteRoutes: MetadataRoute.Sitemap = quotes.map((q) => ({
    url: `${baseUrl}/quotes/${q.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...quoteRoutes];
}
