'use client';

import { useState, use } from 'react';
import { getMatchById } from '@/lib/mock-data';
import { MatchHeader } from '@/components/match-header';
import { PredictionCard } from '@/components/prediction-card';
import { AnalysisTab } from '@/components/analysis-tab';
import { StatsTab } from '@/components/stats-tab';

interface MatchPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function MatchPage({ params }: MatchPageProps) {
  const { id } = use(params);
  const match = getMatchById(id);
  const [activeTab, setActiveTab] = useState<'prediction' | 'analysis' | 'stats'>(
    'prediction'
  );

  if (!match) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Match not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <MatchHeader leagueName={match.leagueName} />

      <div className="max-w-2xl mx-auto">
        <PredictionCard match={match} />

        <div className="bg-gray-900 rounded-lg m-4 overflow-hidden">
          <div className="flex border-b border-gray-700">
            {(['prediction', 'analysis', 'stats'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="min-h-96">
            {activeTab === 'prediction' && (
              <div className="p-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Main Pick
                    </p>
                    <p className="text-2xl font-bold text-gray-100">
                      {match.prediction.mainPick}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Confidence
                    </p>
                    <p className="text-lg font-semibold text-gray-200">
                      {match.prediction.confidence}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      Risk Level
                    </p>
                    <p className="text-sm font-medium text-gray-300 capitalize">
                      {match.prediction.riskLevel}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                      Reasoning
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {match.prediction.reason}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analysis' && <AnalysisTab match={match} />}

            {activeTab === 'stats' && (
              <StatsTab
                match={match}
                homeTeamName={match.homeTeam.name}
                awayTeamName={match.awayTeam.name}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
