import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All images are local (in /public), no remote domains needed
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
