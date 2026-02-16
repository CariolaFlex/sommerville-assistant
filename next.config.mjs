/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack config para Mermaid
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mermaid$/,
      use: 'raw-loader',
    });
    return config;
  },
};

export default nextConfig;
