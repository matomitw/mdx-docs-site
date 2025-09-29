// next.config.mjs
import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import { remarkTypographer } from './plugins/remark-typographer.js';
import { NextConfig } from 'next';




const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'],
  output: 'export', // ✅ cast string to literal type
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json', '.md'],
  },
};


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'],
//   output: 'export',
//   trailingSlash: true,
//   images: {
//     unoptimized: true,
//   },
//   turbopack: {
//     resolveExtensions: [
//       '.mdx',
//       '.tsx',
//       '.ts',
//       '.jsx',
//       '.js',
//       '.json',
//       '.md',
//     ],
//   },
// };

export default withMDX({
  extension: /\.(md|mdx)?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkSmartypants,
      remarkTypographer(),
    ],
    rehypePlugins: [],
  },
})(nextConfig);
