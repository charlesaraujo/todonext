/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  i18n: {
    locales: ["pt-br"],
    defaultLocale: "pt-br",
  },
  experimental: {
    nextScriptWorkers: true,
  },
});

module.exports = nextConfig;
