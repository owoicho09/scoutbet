'use client';

import { Match } from '@/lib/mock-data';
import { ConfidenceBadge } from './confidence-badge';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface TopPickCardProps {
  match: Match;
}

export function TopPickCard({ match }: TopPickCardProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Link href={`/match/${match.id}`}>
      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-xl p-6 mx-4 my-4 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
        <div className="mb-4">
          <p className="text-sm font-medium opacity-90">{match.leagueName}</p>
          <p className="text-xs opacity-75">{formatTime(match.kickoffTime)}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-bold text-text-pretty">
            {match.homeTeam.name} vs {match.awayTeam.name}
          </h3>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm opacity-90">Top Pick</p>
            <p className="text-lg font-bold">{match.prediction.mainPick}</p>
          </div>
          <ConfidenceBadge
            confidence={match.prediction.confidence}
            riskLevel={match.prediction.riskLevel}
            size="md"
          />
        </div>

        <div className="border-t border-white/20 pt-3 flex items-start justify-between">
          <p className="text-sm">{match.prediction.reason}</p>
          <ChevronRight size={20} className="flex-shrink-0 ml-2" />
        </div>
      </div>
    </Link>
  );
}
