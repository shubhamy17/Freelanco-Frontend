/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["freelanco.s3.us-west-1.amazonaws.com","ipfs.io", "localhost", "cryptologos.cc"],
  },
};

module.exports = nextConfig;
