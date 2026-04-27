import React from 'react';
import Link from 'next/link';
import type { GetStaticProps } from 'next';
import { getAllPages, type PageInfo } from '../lib/getPages';

interface HomeProps {
  pages: PageInfo[];
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const pages = getAllPages();
  return { props: { pages } };
};

export default function Home({ pages }: HomeProps) {
  return (
    <div className="not-prose">
      {/* Hero — left-aligned per skill rule 3 (anti-center bias, variance=8) */}
      <div className="py-10 sm:py-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tighter leading-none text-zinc-900">
          TW MDX Docs Site
        </h1>
        <p className="mt-4 text-lg text-zinc-500 leading-relaxed max-w-[65ch]">
          A collection of markdown and MDX pages. Clean, readable, well-structured.
        </p>
      </div>

      {/* Page grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group block p-5 sm:p-6 rounded-xl border border-zinc-200 bg-white hover:border-emerald-300 transition-all duration-200 active:scale-[0.98]"
          >
            <h2 className="text-base sm:text-lg font-semibold text-zinc-900 group-hover:text-emerald-700 transition-colors">
              {page.title}
            </h2>
            <p className="mt-1 text-sm text-zinc-400">
              {page.fileName}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
