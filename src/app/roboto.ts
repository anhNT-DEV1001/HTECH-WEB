import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // disallow: "/admin/",
    },
    sitemap: "https://mysite.com/sitemap.xml", // Thay đổi url trong env
  };
}
