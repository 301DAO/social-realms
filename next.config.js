// @ts-nocheck

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  experimental: {
    // concurrentFeatures: true,
    urlImports: [ 'https://fonts.googleapis.com/', 'https://api.wrappedpunks.com/' ],
  },
  images: {
    domains: [ 'storage.googleapis.com', 'api.wrappedpunks.com' ],
  },
  env: {
    RPC_URL_1: 'https://mainnet.infura.io/v3/84842078b09946638c03157f83405213',
    RPC_URL_4: 'https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213',
  },
  reactStrictMode: true,
  swcMinify: true,
  styledComponents: true,
  trailingSlash: true,
  serverRuntimeConfig: {
    // Will only be available on the server side
    //mySecret: 'secret',
  },
  /**
   * can do:
   * import getConfig from 'next/config'
   * const { publicRuntimeConfig } = getConfig()
   * <Image src={publicRuntimeConfig.IMAGE_URL} />
   */
  publicRuntimeConfig: {
    // Will be available on both server and client
    // staticFolder: '/static',
    // apiUrl: 'https://api.example.com',
  },
  webpack: ( config, { dev, isServer, defaultLoaders, webpack } ) => {
    // Important: return the modified config
    // if (!isServer) {
    //   config.node = {
    //     dgram: 'empty',
    //     fs: 'empty',
    //     net: 'empty',
    //     tls: 'empty',
    //     child_process: 'empty',
    //   };

    //   // ignore apm (might use in nextjs code but dont want it in client bundles)
    //   config.plugins.push(
    //     new webpack.IgnorePlugin(/^(elastic-apm-node)$/),
    //   );
    // }
    return config
  },
  poweredByHeader: false,
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-left'
  }

  // distDir: "build",

}

module.exports = nextConfig