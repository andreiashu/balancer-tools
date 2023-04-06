/** @type {import('next').NextConfig} */

module.exports = {
  transpilePackages: [
    "@balancer-pool-metadata/gql",
    "@balancer-pool-metadata/schema",
  ],
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  env: {
    PINATA_API_KEY: process.env.PINATA_API_KEY,
    PINATA_API_SECRET: process.env.PINATA_API_SECRET,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/metadata",
        permanent: false,
      },
    ];
  },
};
