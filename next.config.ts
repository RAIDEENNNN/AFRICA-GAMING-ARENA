import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.VERCEL ? "export" : undefined,
};

export default nextConfig;
