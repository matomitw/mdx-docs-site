// next.config.mjs
import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkTypographer from './plugins/remark-typographer.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
};

export default withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkSmartypants,
      remarkTypographer,
    ],
    rehypePlugins: [],
  },
})(nextConfig);















// // next.config.mjs
// import withMDX from '@next/mdx';
// import remarkGfm from 'remark-gfm';
// import remarkSmartypants from 'remark-smartypants';



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
//   reactStrictMode: true,
// };

// export default withMDX({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [
//       remarkGfm,
//       [remarkSmartypants, { typographer: true }],
//     ],
//     rehypePlugins: [],
//   },
// })(nextConfig);


// export default withMDX({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [remarkGfm, remarkSmartypants],
//     rehypePlugins: [],
//   },
// })(nextConfig);
