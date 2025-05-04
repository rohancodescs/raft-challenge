/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Tell Next to inject its own PostCSS pipeline with Tailwind + Autoprefixer
    optimizeCss: true,
    // tailwind: true
  }
};

export default nextConfig;

