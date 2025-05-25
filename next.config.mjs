/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['placeholder.svg'], // Add any external image domains
  },
  // Enable static exports for better performance
  output: 'standalone',
  // Optimize for production
  swcMinify: true,
  // Enable experimental features
  experimental: {
    optimizeCss: true,
  },
}

export default nextConfig
