/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true // для подальшого "export" відключає підтримку компонентів <Image>
  },
  trailingSlash: true,  // включає перехід по компонентам через URL, раніше тільки через links
};

module.exports = nextConfig;
