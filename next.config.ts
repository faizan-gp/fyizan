import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site used to be a personal portfolio. These pages are gone; send any
  // old links (and the search results pointing at them) to the new home page.
  async redirects() {
    return [
      { source: "/about", destination: "/", permanent: true },
      { source: "/experience", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/research", destination: "/", permanent: true },
      { source: "/projects", destination: "/apps", permanent: true },
      { source: "/projects/:slug", destination: "/apps", permanent: true },
    ];
  },
};

export default nextConfig;
