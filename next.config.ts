import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Qualities used by next/image across the scenes (Next 16 only allows listed values).
    qualities: [65, 70, 75],
  },
};

export default nextConfig;
