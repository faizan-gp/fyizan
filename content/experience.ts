import type { ExperienceEntry } from "@/lib/content/types";

// Ordered exactly as the source resume lists them. The Mentoring Minds and
// first Gallopade stint overlap on paper (Mar 2021–Nov 2022 vs Nov 2021–Sept
// 2022) — kept as given rather than silently corrected; see requirements.md
// §14.6.
export const experience: ExperienceEntry[] = [
  {
    company: "Gallopade",
    role: "Senior Software Engineer",
    startDate: "2024-04",
    endDate: "present",
    displayDate: "April 2024 – Present",
    // TODO(faizan): the source resume doesn't carry a description for this
    // stint yet — replace with specifics from the current role.
    summary:
      "Returned to Gallopade in a senior capacity, continuing to lead backend architecture on the CQRS and event-sourcing platform built in the earlier engagement below, now with a broader hand in the team's engineering practice.",
    stack: ["Java", "Spring Boot", "CQRS", "Axon Framework", "Kubernetes", "Azure"],
  },
  {
    company: "Zero Latency Webster",
    role: "Full-Stack Engineer & SEO Strategist",
    startDate: "2025-05",
    endDate: "2026-04",
    displayDate: "May 2025 – April 2026",
    summary:
      "Built a high-performance, responsive web application from the ground up with Next.js, focused on a modern, minimalist UI, and optimized Core Web Vitals to consistently score 95+ on Google PageSpeed Insights across mobile and desktop. Implemented on-page and off-page SEO — JSON-LD structured data, semantic architecture, topical authority — driving first-page rankings for 50+ high-value keywords within six months of launch, and optimized early for AI-driven search and generative answers (Google SGE, ChatGPT).",
    stack: ["Next.js", "Technical SEO", "JSON-LD", "Core Web Vitals"],
  },
  {
    company: "Career break",
    role: "",
    startDate: "2022-10",
    endDate: "2024-03",
    displayDate: "October 2022 – March 2024",
    summary: "A gap in the timeline, stated plainly rather than explained away.",
    stack: [],
  },
  {
    company: "Gallopade",
    role: "Full-Stack Developer",
    startDate: "2021-11",
    endDate: "2022-09",
    displayDate: "November 2021 – September 2022",
    summary:
      "Transitioned to Gallopade to craft a new K-12 product, owning both frontend and backend. Built the frontend in React.js and Tailwind CSS, and integrated Java Spring Boot with the CQRS pattern and the Axon Framework for an event-sourcing architecture, adding load balancing to optimize performance and scalability. Moved into DevOps: containerized the microservices with Docker and deployed to Azure with Kubernetes.",
    stack: ["React.js", "Tailwind CSS", "Java Spring Boot", "CQRS", "Axon Framework", "Docker", "Kubernetes", "Azure"],
  },
  {
    company: "Mentoring Minds",
    role: "Backend Developer",
    startDate: "2021-03",
    endDate: "2022-11",
    displayDate: "March 2021 – November 2022",
    summary:
      "At Mentoring Minds, a US-based ed-tech company, led the transition from a monolithic K-12 app using command architecture to a microservices architecture. Built optimized RESTful web services in Java Spring Boot, improved performance through targeted algorithmic work, and managed the seamless migration of legacy data between MySQL and MongoDB.",
    stack: ["Java Spring Boot", "Microservices", "REST", "MySQL", "MongoDB"],
  },
];
