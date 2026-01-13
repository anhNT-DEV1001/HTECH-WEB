import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Mảng các url của trang web (Dạng object)
    { url: "https://mysite.com", lastModified: new Date() },
  ];
}
