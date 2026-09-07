import type { Category } from "@/lib/content/types";

// App category taxonomy — see requirements.md §5 and seo-strategy.md §3.
// A category is added only once an app in it is ready to ship its own
// landing page (requirements.md §2 non-goals).

export const categories: Category[] = [
  {
    slug: "money",
    name: "Money & Spending Decisions",
    description:
      "Apps that turn a price into something you can actually feel before you pay it — built for the moment right before a purchase, and the moment right after.",
    accentColor: "money",
  },
];
