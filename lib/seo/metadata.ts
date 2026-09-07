import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

interface BuildMetadataInput {
  title: string;
  description: string;
  path: string;
}

// Shared per-page metadata builder — every page calls this so canonical
// URLs, Open Graph, and Twitter cards stay consistent without being
// re-decided per page. See architecture.md §5 and seo-strategy.md §7.
export function buildMetadata({ title, description, path }: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
