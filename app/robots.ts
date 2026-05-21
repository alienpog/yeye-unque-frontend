import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/only-admin-allowed/"],
    },

    sitemap: "https://yeyeunique.com/sitemap.xml",
  };
}