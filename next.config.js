// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    urlImports: [ 'https://cdn.skypack.dev/', 'https://fonts.googleapis.com/' ],
  },
  concurrentFeatures: true,
  images: {
    domains: [ 'storage.googleapis.com' ],
  },
  env: {
    RPC_URL_1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    RPC_URL_4: 'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213',
  },
  reactStrictMode: true,
  swcMinify: true,
  styledComponents: true,
  trailingSlash: true,
  // distDir: "build",
}

module.exports = nextConfig