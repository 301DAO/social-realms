/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: { fix: true },
  experimental: {},
  images: {
    domains: ['live.staticflickr.com'],
  },
  poweredByHeader: false,
  async rewrites() {
    return [
      {
        source: '/feed/:address',
        destination: '/feed',
      },
    ];
  },
};
