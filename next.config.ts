import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['sequelize'],
  images: {
    remotePatterns: [{ hostname: 'res.cloudinary.com' }],
  },
  cacheComponents: true,
  // experimental: {
  //   cacheComponents: true,
  // },
};

export default nextConfig;
