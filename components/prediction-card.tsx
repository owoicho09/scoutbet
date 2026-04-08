'use client';

import { Match } from '@/lib/mock-data';
import { ConfidenceBadge } from './confidence-badge';

interface PredictionCardProps {
  match: Match;
}

export function PredictionCard({ match }: PredictionCardProps) {
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 m-4 shadow-md">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-200 mb-2">
          {match.homeTeam.name} vs {match.awayTeam.name}
        </h2>
        <p className="text-sm text-gray-400">{formatTime(match.kickoffTime)}</p>
      </div>

      <div className="mb-6">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Prediction</p>
        <p className="text-3xl font-bold text-gray-100 mb-4">
          {match.prediction.mainPick}
        </p>
        <ConfidenceBadge
          confidence={match.prediction.confidence}
          riskLevel={match.prediction.riskLevel}
          size="lg"
        />
      </div>

      <div className="border-t border-gray-700 pt-4">
        <p className="text-sm text-gray-300">{match.prediction.reason}</p>
      </div>
    </div>
  );
}
