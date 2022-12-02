/** @type {import('next').NextConfig} */
HOSTNAME="http://localhost";
PORT="80";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  env: {
    HOST: `${HOSTNAME}:${PORT}`
  },  
}

module.exports = nextConfig
