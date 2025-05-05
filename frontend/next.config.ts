/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { optimizeCss: true },
  eslint: {
    ignoreDuringBuilds: true,   // 
  },
};
export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     // Tell Next to inject its own PostCSS pipeline with Tailwind + Autoprefixer
//     optimizeCss: true,

//     // tailwind: true
//   },
//   eslint:{
//     ignoreDuringBuilds: true,
//   },

// };

// export default nextConfig;

