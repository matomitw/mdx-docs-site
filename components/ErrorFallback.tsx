import React from 'react';
import Link from 'next/link';
import type { FallbackProps } from 'react-error-boundary';

export default function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="not-prose flex flex-col items-center justify-center py-24 text-center">
      <p className="text-7xl font-extrabold tracking-tighter text-zinc-200">Oops</p>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900">
        Well, that wasn&apos;t supposed to happen
      </h1>
      <p className="mt-3 text-base text-zinc-500 max-w-md">
        Something went sideways.
        <br/>
        Don&apos;t worry, our top agent <span className="font-semibold text-zinc-700">Matomi Lucky Ezekiel </span> has
        been dispatched to fix it. He&apos;s probably already on it with a coffee in hand.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={resetErrorBoundary}
          className="px-5 py-2.5 rounded-lg border border-zinc-300 text-zinc-700 text-sm font-medium hover:bg-zinc-50 transition-colors active:scale-[0.98]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-lg bg-emerald-600 !text-white text-sm font-medium hover:bg-emerald-700 transition-colors active:scale-[0.98] no-underline border-none"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
