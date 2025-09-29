import withMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkSmartypants from 'remark-smartypants';
import remarkTypographer from './plugins/remark-typographer.js';

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  
  webpack: (config) => {
    // Suppress VFileMessage serialization warnings from MDX
    config.infrastructureLogging = {
      level: 'error',
    };
    
    return config;
  },
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




// working but not suppressing error vfilemessage
// import withMDX from '@next/mdx';
// import remarkGfm from 'remark-gfm';
// import remarkSmartypants from 'remark-smartypants';
// import remarkTypographer from './plugins/remark-typographer.js';

// /** @type {import('next').NextConfig} */
// const nextConfig: import('next').NextConfig = {
//   output: 'export',
//   pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
//   reactStrictMode: true,

// };

// export default withMDX({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [
//       remarkGfm,
//       remarkSmartypants,
//       remarkTypographer,
//     ],
//     rehypePlugins: [],
//   },
// })(nextConfig);















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
