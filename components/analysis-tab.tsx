'use client';

import { Match } from '@/lib/mock-data';

interface AnalysisTabProps {
  match: Match;
}

export function AnalysisTab({ match }: AnalysisTabProps) {
  if (!match.analysis) {
    return (
      <div className="p-4 text-gray-400">
        No analysis available for this match.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-200 mb-2">Overview</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          {match.analysis.summary}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-gray-200 mb-3">Key Points</h3>
        <ul className="space-y-2">
          {match.analysis.keyPoints.map((point, idx) => (
            <li key={idx} className="text-sm text-gray-400 flex gap-2">
              <span className="text-red-500 flex-shrink-0">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
