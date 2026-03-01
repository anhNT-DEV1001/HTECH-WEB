import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://htechevent.com";
  
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
    { url: `${baseUrl}/vi`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/en`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];
}