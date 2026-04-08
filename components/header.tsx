'use client';

import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-1">
          <span className="text-2xl font-bold">
            <span className="text-red-500">Scout</span>
            <span className="text-black dark:text-white">Bet</span>
          </span>
        </div>
        <button className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
          <Search size={20} className="text-gray-400" />
        </button>
      </div>
    </header>
  );
}
