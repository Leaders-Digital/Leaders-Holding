import { SITE_URL, SOCIETY_NAMES, slugify } from '@/lib/seo';

export default function sitemap() {
  const base = SITE_URL;
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/recrutement`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    ...SOCIETY_NAMES.map((name) => ({
      url: `${base}/societe/${slugify(name)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    })),
  ];
}
