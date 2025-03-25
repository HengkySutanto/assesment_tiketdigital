/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ota-gin.onrender.com',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: 'ota-gin.onrender.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
