'use client';

import { Match } from '@/lib/mock-data';
import { StatComparisonRow } from './stat-comparison-row';

interface StatsTabProps {
  match: Match;
  homeTeamName: string;
  awayTeamName: string;
}

export function StatsTab({
  match,
  homeTeamName,
  awayTeamName,
}: StatsTabProps) {
  if (!match.stats) {
    return (
      <div className="p-4 text-gray-400">
        No stats available for this match.
      </div>
    );
  }

  const homeStats = match.stats.homeTeam;
  const awayStats = match.stats.awayTeam;

  const statKeys = Object.keys(homeStats).filter(
    (key) => key in awayStats
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700">
        <span className="text-sm font-semibold text-gray-200">{homeTeamName}</span>
        <span className="text-xs text-gray-500">Head to Head</span>
        <span className="text-sm font-semibold text-gray-200 text-right">
          {awayTeamName}
        </span>
      </div>

      <div className="space-y-0">
        {statKeys.map((key) => (
          <StatComparisonRow
            key={key}
            label={key}
            homeValue={homeStats[key] ?? '-'}
            awayValue={awayStats[key] ?? '-'}
          />
        ))}
      </div>
    </div>
  );
}
