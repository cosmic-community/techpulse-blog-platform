/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // We are using imgix_url for optimization
  },
  // Ensure typedRoutes is NOT enabled to avoid build errors
  experimental: {
    typedRoutes: false
  }
};

module.exports = nextConfig;