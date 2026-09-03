/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Anime cover art / thumbnails are served from the configured AniKoto API's
    // upstream CDN, which varies by deployment, so we allow any https host here
    // and rely on lib/api.ts + lib/streaming.ts to validate real request URLs.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {},
};

module.exports = nextConfig;
