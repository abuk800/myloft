import type { NextConfig } from "next";

const isDemo = !["0", "false"].includes((process.env.NEXT_PUBLIC_IS_DEMO ?? "1").toLowerCase());

const nextConfig: NextConfig = {
  async headers() {
    return isDemo ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : [];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
