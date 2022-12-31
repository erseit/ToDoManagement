/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    BACKEND_ENDPOINT: process.env.BACKEND_ENDPOINT,
  },  
}

module.exports = nextConfig
