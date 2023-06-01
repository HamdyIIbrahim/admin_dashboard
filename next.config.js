/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  target: 'server',
  future: {
    webpack5: true,
  },
  compiler: {
    ssr: true,
  }
}

module.exports = nextConfig
