import type { MetadataRoute } from "next";

/** Served as torneos.arma2.com.ar/sitemap.xml through the host proxy. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://torneos.arma2.com.ar/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://torneos.arma2.com.ar/ejemplo",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];
}
