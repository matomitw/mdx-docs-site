# TW MDX Docs Site

Turn your markdown files into a styled website. Drop `.md` or `.mdx` files into the `pages/` folder and they become web pages automatically.

**Live site:** https://matomitw.github.io/mdx-docs-site/

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/matomitw/mdx-docs-site.git
cd mdx-docs-site

# Install dependencies
pnpm install

# Start the dev server
pnpm run dev
```

Open http://localhost:3000 to see your site.

---

## Adding Pages

Drop a markdown file into `pages/` and it becomes a route:

| File | URL |
|------|-----|
| `pages/guide.md` | `/guide` |
| `pages/blog/post.mdx` | `/blog/post` |
| `pages/docs/setup.md` | `/docs/setup` |

The homepage and navbar update automatically no config needed.

### File Types

- `.md` — Standard markdown. Use this for most content.
- `.mdx` — Markdown + React components. Use when you need interactive elements or custom components.
- `.tsx` / `.jsx` — Full React pages for custom layouts.

### When to use `.md` vs `.mdx`

Use `.md` unless you need to import React components. MDX is stricter — characters like `<`, `{`, `}` are treated as JSX and will cause errors if used as plain text.

---

## Supported Markdown Features

Everything you'd expect from GitHub-flavored markdown works:

- **Headings** (`# H1` through `###### H6`)
- **Bold**, *italic*, ~~strikethrough~~
- Ordered and unordered lists
- Links and images
- Blockquotes (including nested)
- Code blocks with syntax highlighting
- Tables
- Task lists (`- [x] done`, `- [ ] todo`)
- Math equations (inline `$E=mc^2$` and block `$$...$$`)

---

## Using React Components in MDX

Create a component in `components/`, then import it in any `.mdx` file:

```mdx
import MyComponent from '../components/MyComponent'

# My Page

Here's some markdown, and below is a React component:

<MyComponent />
```

---

## Project Structure

```
pages/           → Your content lives here (each file = a route)
  _app.tsx       → Global layout wrapper (don't delete)
  _document.tsx  → HTML skeleton, fonts, meta tags (don't delete)
  index.tsx      → Homepage (auto-lists all pages)
  404.tsx        → Custom 404 page
  500.tsx        → Custom 500 page
  blog/          → Subfolder = nested route (/blog/...)
  docs/          → Another subfolder (/docs/...)

components/      → Reusable React components
  Layout.tsx     → Nav, footer, prose wrapper
  ErrorFallback.tsx → Error boundary UI

styles/
  globals.css    → All styling (Tailwind + prose overrides)

lib/
  getPages.ts    → Auto-discovers pages for nav + homepage

public/          → Static assets (images, SVGs, etc.)
```

---

## Adding Images

**Option 1:** Put images in `public/` and reference them:
```md
![Alt text](/my-image.png)
```

**Option 2:** Use external URLs:
```md
![Alt text](https://example.com/image.png)
```

---

## Customization

### Change the site name
Edit `components/Layout.tsx` — find `TW MDX Docs` and replace it.

### Change the footer
Edit `components/Layout.tsx` — find the footer section near the bottom.

### Change colors
Edit `styles/globals.css` — the CSS variables at the top control the color scheme. The accent color is emerald (`#059669`).

### Change the font
Edit `styles/globals.css` (the `font-family` in `body`) and `pages/_document.tsx` (the Google Fonts link).

---

## Deploying to GitHub Pages

The repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and deploys on push to `main`.

### Setup

1. Go to your repo → Settings → Pages
2. Set Source to **GitHub Actions**
3. Push to `main` — the site deploys automatically

### Important

The `basePath` in `next.config.ts` is set to `/mdx-docs-site` for GitHub Pages. If your repo has a different name, update it:

```ts
basePath: isProd ? '/your-repo-name' : '',
assetPrefix: isProd ? '/your-repo-name/' : '',
```

---

## Validate Before Pushing

```bash
pnpm run validate
```

This runs typecheck + lint + build in sequence — the same checks that run in CI.

---

## Commands

| Command | What it does |
|---------|-------------|
| `pnpm run dev` | Start dev server |
| `pnpm run build` | Production build + static export |
| `pnpm run typecheck` | Check for TypeScript errors |
| `pnpm run lint` | Run ESLint |
| `pnpm run validate` | Run all checks (typecheck + lint + build) |

---

## Security: Secret Scanning

This project includes automatic secret detection to prevent accidental exposure of passwords, API keys, or tokens in your markdown files.

### How it works

Three layers of protection:

1. **On save** — A Kiro hook scans your file every time you save a `.md`, `.mdx`, or code file.
2. **Pre-commit** — A git hook blocks commits if secrets are detected.
3. **CI pipeline** — GitHub Actions runs the scanner before building. If secrets are found, the deploy fails.

### Setup the git hook (one time)

```bash
bash scripts/install-hooks.sh
```

### Run manually

```bash
pnpm run scan-secrets
```

### What it detects

- AWS access keys
- GitHub tokens (PAT, OAuth)
- OpenAI / Stripe / Slack / Square keys
- Password, secret, token, api_key assignments
- Private key blocks (RSA, DSA, EC)
- Database connection strings
- `.env` files not in `.gitignore`

### If a secret is detected

1. Remove the sensitive value from the file
2. If already committed, rotate the credential immediately
3. Use environment variables or a secrets manager instead

---

Built by Teamwork Saint Priest.
