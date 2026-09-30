import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 requires an explicit allowlist. 90 is for the hero portrait, which the
    // cursor lens will reveal at full detail in phase 3.
    qualities: [75, 90],
  },
};

export default nextConfig;
