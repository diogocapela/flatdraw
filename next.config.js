/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'dist',
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
