
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/robots", // Resolves the robots.ts file in the app folder
      },
    ];
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/random',
      },
      {
        protocol: 'https',
        hostname: 'khaasdeal.com',
        port: '',
        pathname: '/public/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.solutionsxpert.net',
        port: '',
        pathname: '/bucketwebp/**',
      },
      {
        protocol: 'https',
        hostname: 'soghats.pk',
        port: '',
        pathname: '/assets/**',
      },
      {
        protocol: 'https',
        hostname: 'dashboard.soghats.pk',
        port: '',
        pathname: '/assets/**',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
module.exports = nextConfig;


