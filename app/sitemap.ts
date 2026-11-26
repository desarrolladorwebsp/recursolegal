import type { MetadataRoute } from "next";
import { guides } from "../lib/resources";
import { absoluteUrl, guidePath, isPreview, seoPages } from "../lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  if (isPreview) return [];

  return [
    ...Object.values(seoPages).filter((page) => !("index" in page) || page.index).map(({ path }) => ({ url: absoluteUrl(path) })),
    ...guides.map(({ slug }) => ({ url: absoluteUrl(guidePath(slug)) })),
  ];
}
