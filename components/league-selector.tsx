'use client';

import { leagues } from '@/lib/mock-data';
import { useState } from 'react';

interface LeagueSelectorProps {
  selectedLeague: string;
  onSelectLeague: (leagueId: string) => void;
}

export function LeagueSelector({
  selectedLeague,
  onSelectLeague,
}: LeagueSelectorProps) {
  return (
    <div className="bg-black border-b border-gray-800 px-4 py-3">
      <div className="flex gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
        {leagues.map((league) => (
          <button
            key={league.id}
            onClick={() => onSelectLeague(league.id)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all ${
              selectedLeague === league.id
                ? 'bg-red-500 text-white'
                : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
            }`}
          >
            {league.name}
          </button>
        ))}
      </div>
    </div>
  );
}
