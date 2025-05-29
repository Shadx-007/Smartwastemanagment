//** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['placeholder.svg'], // Replace with actual image domains if needed
  },
  output: 'standalone',
  experimental: {
    optimizeCss: true, // ⚠️ Note: 'optimizeCss' is experimental and might be removed in future releases
  },
}

export default nextConfig

