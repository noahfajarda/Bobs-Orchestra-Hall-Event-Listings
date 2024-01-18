/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // allow any image
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig