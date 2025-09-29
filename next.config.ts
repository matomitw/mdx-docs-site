// next.config.mjs
import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import { withRemarkTypographer } from './plugins/remark-typographer.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'mdx', 'md'],
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveExtensions: [
      '.mdx',
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.json',
      '.md',
    ],
  },
};

export default withMDX({
  extension: /\.(md|mdx)?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkSmartypants,
      withRemarkTypographer(), // ✅ now serializable
    ],
    rehypePlugins: [],
  },
})(nextConfig);
