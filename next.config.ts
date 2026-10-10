import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Constitution Principle II: static app, no server runtime.
  output: "export",
  // Every route becomes a real directory with its own index.html
  // (e.g. out/episodes/index.html, out/episodes/episode-20/index.html).
  // Without it, out/episodes.html collides with the out/episodes/ detail-route
  // directory and extension-less URLs break on plain static hosts (GitHub Pages,
  // `npm run preview`). This keeps the export portable to any CDN.
  trailingSlash: true,
  images: {
    // Required for static export; source assets are pre-compressed instead.
    unoptimized: true,
  },
};

export default nextConfig;
