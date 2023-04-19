/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io", "localhost", "cryptologos.cc"],
  },
};

module.exports = nextConfig;
