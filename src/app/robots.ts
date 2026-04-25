import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/login", "/*.json$"],
      },
      { userAgent: "AhrefsBot", allow: "/", crawlDelay: 10 },
      { userAgent: "SemrushBot", allow: "/", crawlDelay: 10 },
    ],
    sitemap: "https://www.linsaem.fr/sitemap.xml",
    host: "https://www.linsaem.fr",
  };
}
