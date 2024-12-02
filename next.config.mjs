/** @type {import('next').NextConfig} */

import initializeCron from "./lib/cron.js";

initializeCron();

const nextConfig = {
  images: {
    unoptimized: true, // Disable Next.js image optimization
    domains: ["smile-builders-system.com"], // Allow images to load from your custom domain
  },
};

export default nextConfig;
