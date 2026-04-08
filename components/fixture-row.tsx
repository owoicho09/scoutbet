'use client';

import { Match } from '@/lib/mock-data';
import { ConfidenceBadge } from './confidence-badge';
import Link from 'next/link';

interface FixtureRowProps {
  match: Match;
}

export function FixtureRow({ match }: FixtureRowProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Link href={`/match/${match.id}`}>
      <div className="bg-white dark:bg-gray-900 border-b border-gray-800 px-4 py-3 hover:bg-gray-850 transition-colors cursor-pointer">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 mb-1">{formatTime(match.kickoffTime)}</p>
            <p className="text-sm font-semibold text-gray-200 truncate">
              {match.homeTeam.name}
            </p>
            <p className="text-sm font-semibold text-gray-200 truncate">
              {match.awayTeam.name}
            </p>
          </div>

          <div className="flex-shrink-0 text-right">
            <p className="text-xs font-medium text-gray-400 mb-1">
              {match.prediction.mainPick}
            </p>
            <ConfidenceBadge
              confidence={match.prediction.confidence}
              riskLevel={match.prediction.riskLevel}
              size="sm"
            />
          </div>
        </div>
      </div>
    </Link>
  );
}
