// Canonical brand/Person data — the entity everything else on this site
// connects back to. See seo-strategy.md §2. Used by root layout metadata,
// the sitewide Person JSON-LD, and the About/Home pages.

export const person = {
  fullName: "Faizan un Nabi Gillani",
  displayName: "Faizan Gillani",
  handle: "fyizan",
  jobTitle: "Senior Software Engineer & Indie Maker",
  oneLiner:
    "A full-stack engineer who builds products that respect your time and your data — and ships them himself.",
  shortBio:
    "Faizan is a senior software engineer with a background spanning microservices architecture, event sourcing, and full-stack product development — now building his own apps alongside his day job, starting with Life Hours.",
  longBio: [
    "Faizan is a senior software engineer who has spent his career on both sides of the same problem: making systems that are complicated underneath simple to depend on. He led a monolith-to-microservices migration at Mentoring Minds, an ed-tech company, then joined Gallopade to build a new K-12 product from scratch on CQRS and event sourcing with the Axon Framework — frontend, backend, and eventually the DevOps underneath it, containerized on Docker and deployed to Azure with Kubernetes.",
    "A career break between late 2022 and early 2024 sits in the middle of that timeline, plainly. It's followed by a run at Zero Latency Webster building a Next.js application from the ground up and pushing it to 95+ Core Web Vitals scores while running its on-page and off-page SEO — first-page rankings for 50+ keywords inside six months, and an early bet on optimizing for AI-driven search. He's back at Gallopade now as a senior engineer.",
    "Outside of client and employer work, Faizan builds his own apps end to end — product thinking, architecture, and the interface — with a consistent instinct across all of them: privacy-first, ad-free, and useful offline. Life Hours, a pre-purchase regret calculator, is the first of these to get a public landing page. He also works in motion graphics and graphic design, and holds an interest in applied cybersecurity that shows up in how he treats user data by default.",
  ],
  location: "Pakistan",
  email: "hyrax9562@outlook.com",
  phone: "+92-312-5613087",
  photo: {
    src: "/images/faizan-headshot.jpg",
    alt: "Portrait of Faizan Gillani",
  },
  skillGroups: [
    {
      name: "Languages & frameworks",
      skills: ["Java", "Flutter", "Node.js", "React.js", "Next.js"],
    },
    {
      name: "Architecture & data",
      skills: [
        "Microservices",
        "CQRS",
        "Axon Framework",
        "Kafka",
        "gRPC",
        "Big Data",
      ],
    },
    {
      name: "SEO & growth",
      skills: ["On-page & off-page SEO", "Semantic SEO", "Topical authority"],
    },
    {
      name: "Security",
      skills: ["Cybersecurity", "Kali Linux", "Encryption"],
    },
    {
      name: "Design",
      skills: ["Motion graphics", "After Effects", "Adobe Creative Suite"],
    },
  ],
} as const;
