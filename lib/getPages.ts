import fs from 'fs';
import path from 'path';

export interface PageInfo {
  href: string;
  title: string;
  fileName: string;
}

const IGNORED = ['_app', '_document', 'index', '404', '500', 'api'];
const MD_EXTENSIONS = ['.md', '.mdx'];
const ALL_EXTENSIONS = ['.md', '.mdx', '.tsx', '.jsx', '.js', '.ts'];

function titleFromFileName(name: string): string {
  return name
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function scanDir(dir: string, basePath: string): PageInfo[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const pages: PageInfo[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.') || entry.name === 'api') continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      pages.push(...scanDir(fullPath, `${basePath}/${entry.name}`));
    } else {
      const ext = path.extname(entry.name);
      const nameWithoutExt = path.basename(entry.name, ext);

      if (!ALL_EXTENSIONS.includes(ext)) continue;
      if (IGNORED.includes(nameWithoutExt)) continue;

      pages.push({
        href: `${basePath}/${nameWithoutExt}`,
        title: titleFromFileName(nameWithoutExt),
        fileName: entry.name,
      });
    }
  }

  return pages;
}

export function getAllPages(): PageInfo[] {
  const pagesDir = path.join(process.cwd(), 'pages');
  return scanDir(pagesDir, '').sort((a, b) => a.title.localeCompare(b.title));
}

export function getMarkdownPages(): PageInfo[] {
  const pagesDir = path.join(process.cwd(), 'pages');
  return scanDir(pagesDir, '')
    .filter((p) => {
      const ext = path.extname(p.fileName);
      return MD_EXTENSIONS.includes(ext);
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}
