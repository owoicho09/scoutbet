'use client';

import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

interface MatchHeaderProps {
  leagueName: string;
}

export function MatchHeader({ leagueName }: MatchHeaderProps) {
  return (
    <header className="bg-black border-b border-gray-800">
      <div className="flex items-center gap-4 px-4 py-4">
        <Link href="/" className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-lg font-bold">{leagueName}</h1>
      </div>
    </header>
  );
}
