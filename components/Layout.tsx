import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { PageInfo } from '../lib/getPages';

const MAX_VISIBLE_NAV = 4;

interface LayoutProps {
  children: React.ReactNode;
  pages?: PageInfo[];
}

export default function Layout({ children, pages: initialPages = [] }: LayoutProps) {
  const router = useRouter();
  const [pages, setPages] = useState<PageInfo[]>(initialPages);
  const [moreOpen, setMoreOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPages.length > 0) {
      setPages(initialPages);
      return;
    }
    fetch('/api/pages')
      .then((r) => r.json())
      .then((data) => setPages(data))
      .catch(() => {});
  }, [initialPages]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setMoreOpen(false);
  }, [router.pathname]);

  const visibleLinks = pages.slice(0, MAX_VISIBLE_NAV);
  const overflowLinks = pages.slice(MAX_VISIBLE_NAV);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [router.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-zinc-200">
        <nav className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 hover:text-emerald-700 transition-colors"
          >
            TW MDX Docs
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden p-2 rounded-lg text-zinc-500 hover:bg-zinc-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            <li>
              <Link
                href="/"
                className={`px-3 py-1.5 rounded-lg text-base font-medium transition-colors ${
                  router.pathname === '/'
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                }`}
              >
                Home
              </Link>
            </li>

            {visibleLinks.map((link) => {
              const isActive = router.pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              );
            })}

            {overflowLinks.length > 0 && (
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setMoreOpen((v) => !v)}
                  className={`px-3 py-1.5 rounded-lg text-base font-medium transition-colors flex items-center gap-1 ${
                    moreOpen
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  More
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {moreOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-zinc-200 py-1 z-50">
                    {overflowLinks.map((link) => {
                      const isActive = router.pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={`block px-4 py-2.5 text-base transition-colors ${
                            isActive
                              ? 'bg-emerald-50 text-emerald-700 font-medium'
                              : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'
                          }`}
                        >
                          {link.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
            )}
          </ul>

          {/* Mobile nav dropdown */}
          {mobileOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-zinc-200 shadow-lg md:hidden">
              <div className="px-4 py-3 space-y-1">
                <Link
                  href="/"
                  className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                    router.pathname === '/'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  Home
                </Link>
                {pages.map((link) => {
                  const isActive = router.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      {link.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <article className="prose prose-lg prose-zinc max-w-none">
          {children}
        </article>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center text-sm text-zinc-400">
          &copy; 2026 Teamwork Saint Priest
        </div>
      </footer>
    </div>
  );
}
