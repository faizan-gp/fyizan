import type { Project } from "@/lib/content/types";

export const qoineer: Project = {
  slug: "qoineer",
  name: "Qoineer",
  period: "2022 – 2023",
  summary:
    "A hedge-optimized trading app for simultaneous long/short grid strategies, built for high-concurrency crypto markets.",
  role: "Full-stack developer & designer",
  stack: ["Node.js", "Dart", "Flutter", "Firestore", "Binance API"],
  highlights: [
    "Designed and built a responsive web and mobile app for trade signals, using grid strategies for simultaneous long and short positions.",
    "Built the backend in a mix of Node.js and Dart, with a Flutter frontend and real-time updates through Firestore.",
    "Integrated the Binance API for live crypto market data, with transactional consistency guaranteed across trades.",
    "Reached production-readiness for high-concurrency, diverse trading scenarios.",
  ],
  updatedAt: "2023-12-31",
};
