
<!-- Set Up the Next.js Project Locally -->

<!-- Create a new directory and initialize the project: -->

mkdir my-mdx-site
cd my-mdx-site
npx create-next-app@latest . --typescript --tailwind --eslint --app


<!-- Install MDX support -->

npm install @mdx-js/loader @mdx-js/react @types/mdx

<!-- Configure MDX in next.config.js (create/edit the file in your root) -->

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack(config) {
    config.resolve.fullySpecified = false;
    return config;
  },
};

module.exports = nextConfig;

<!-- Update tsconfig.json to include MDX -->

{
  "compilerOptions": {
    // ... existing options ...
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mdx"],
  "exclude": ["node_modules"]
}

<!-- Create a sample MDX page: Make a pages/docs.mdx file (Next.js uses pages/ for routing) -->

---
title: My First MDX Page
---

# Hello, MDX!

This is **Markdown** with {`JSX`}! Here's some inline code: `<div>Hello</div>`.

export const dynamicComponent = () => <p>This is a dynamic JSX element!</p>;

<dynamicComponent />


<!-- Test locally -->

npm run dev

<!-- Visit http://localhost:3000/docs to see your MDX page. -->

<!-- Step 2 Github pipeline hosting and deployment -->

<!-- Step 2: Create the GitHub Actions Workflow -->

<!-- .github/workflows/deploy.yml -->

<!-- Enable static export in next.config.js (add this for GitHub Pages compatibility)-->

const nextConfig = {
  // ... existing config ...
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,  // Disable Next.js image optimization for static export
  },
};


<!-- This outputs static files to /out (built above). -->

<!-- Update package.json scripts (add static export) -->

{
  "scripts": {
    // ... existing scripts ...
    "export": "next export",
    "build": "next build && next export"
  }
}


<!-- NOTE -->
<!-- create .env file to opt out of next telemetry -->
NEXT_TELEMETRY_DISABLED=1