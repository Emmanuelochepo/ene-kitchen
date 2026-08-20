import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/preview"],
      },
    ],
    sitemap: "https://ene-kitchen.vercel.app/sitemap.xml",
  };
}
