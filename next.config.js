/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,

  env: {
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN,
  },

  images: {
    domains: ['robohash.org'],
  },
}
