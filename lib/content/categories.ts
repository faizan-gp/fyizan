import { categories } from "@/content/categories";
import type { Category } from "./types";

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
