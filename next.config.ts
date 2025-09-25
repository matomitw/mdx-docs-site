
import { NextConfig } from "next";
import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'], // Include mdx files
  output: 'export', 
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json', 'md'],
  },
};

// Export the config wrapped with MDX plugin
export default withMDX({
  extension: /\.(md|mdx)?$/,
})(nextConfig);













// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//    turbopack: {
//     resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
//   },
//   pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
//   output: 'export',
//   trailingSlash: true,
//   images: {
//     unoptimized: true
//   },

// };

// export default nextConfig;
