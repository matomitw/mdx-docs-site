import React from 'react';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className="not-prose flex flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-extrabold tracking-tighter text-zinc-200">404</p>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900">
        Page not found
      </h1>
      <p className="mt-3 text-base text-zinc-500 max-w-md">
        Even our top agents couldn&apos;t locate this page.
        We&apos;ve sent agent <span className="font-semibold text-zinc-700">Matomi Lucky Ezekiel</span> to
        investigate, but between us, he thinks you just typed the wrong URL.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block px-5 py-2.5 rounded-lg bg-emerald-600 !text-white text-sm font-medium hover:bg-emerald-700 transition-colors active:scale-[0.98] no-underline border-none"
      >
        Back to safety
      </Link>
    </div>
  );
}
