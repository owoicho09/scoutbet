'use client'

import Link from 'next/link'
import { Match } from '@/lib/types'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface MatchCardProps {
  match: Match
  showOdds?: boolean
  onClick?: () => void
}

export function MatchCard({ match, showOdds = true, onClick }: MatchCardProps) {
  const confidenceColor =
    match.confidence >= 80
      ? 'bg-success/20 text-success'
      : match.confidence >= 70
        ? 'bg-primary/20 text-primary'
        : 'bg-warning/20 text-warning'

  const levelColor = (level: 'high' | 'medium' | 'low') =>
    level === 'high'
      ? 'bg-success/20 text-success'
      : level === 'medium'
        ? 'bg-warning/20 text-warning'
        : 'bg-destructive/20 text-destructive'

  const predictedWinnerName =
    match.predictedWinner === 'home'
      ? match.homeTeam.name
      : match.predictedWinner === 'away'
        ? match.awayTeam.name
        : 'Draw'

  return (
    <Link href={`/dashboard/match-detail/${match.id}`}>
      <Card
        className="p-4 hover:bg-secondary transition-colors cursor-pointer"
        onClick={onClick}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-muted-foreground">
            {new Date(match.date).toLocaleDateString()} • {match.league}
          </div>
          <Badge variant="secondary" className={confidenceColor}>
            {match.confidence}% Confidence
          </Badge>
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 text-center">
            <div className="text-sm font-bold text-foreground mb-1">{match.homeTeam.name}</div>
            <div className="text-xs text-muted-foreground">{match.homeTeam.league}</div>
          </div>
          <div className="flex-shrink-0 mx-4 text-center">
            <div className="text-2xl font-bold text-primary">VS</div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-sm font-bold text-foreground mb-1">{match.awayTeam.name}</div>
            <div className="text-xs text-muted-foreground">{match.awayTeam.league}</div>
          </div>
        </div>

        {/* Insight */}
        <div className="mb-4 border-l-2 border-primary pl-3">
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {match.insight}
          </p>
        </div>

        {/* Prediction breakdown */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {/* Predicted Winner */}
          <div className="col-span-3 bg-primary/10 rounded-lg p-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Predicted winner</span>
            <span className="text-xs font-bold text-primary">{predictedWinnerName}</span>
          </div>

          {/* BTTS */}
          <div className="bg-secondary rounded-lg p-2 text-center">
            <div className="text-xs text-muted-foreground mb-1">BTTS</div>
            <Badge className={`text-xs px-1.5 py-0 ${levelColor(match.btts)}`}>
              {match.btts}
            </Badge>
          </div>

          {/* Over 2.5 */}
          <div className="bg-secondary rounded-lg p-2 text-center">
            <div className="text-xs text-muted-foreground mb-1">Over 2.5</div>
            <Badge className={`text-xs px-1.5 py-0 ${levelColor(match.over25)}`}>
              {match.over25}
            </Badge>
          </div>

          {/* xG */}
          <div className="bg-secondary rounded-lg p-2 text-center">
            <div className="text-xs text-muted-foreground mb-1">xG</div>
            <div className="text-xs font-bold text-foreground">
              {match.xGHome.toFixed(1)} / {match.xGAway.toFixed(1)}
            </div>
          </div>
        </div>

        {/* Recommended Bet */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg px-3 py-2 flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Recommended bet</span>
          <span className="text-xs font-bold text-primary">{match.recommendedBet}</span>
        </div>

        {/* Odds */}
        {showOdds && (
          <div className="grid grid-cols-3 gap-2 text-xs border-t border-border pt-3">
            <div className="bg-primary/10 rounded p-2 text-center">
              <div className="text-muted-foreground">1</div>
              <div className="font-bold text-primary">{match.odds.home.toFixed(2)}</div>
            </div>
            <div className="bg-warning/10 rounded p-2 text-center">
              <div className="text-muted-foreground">X</div>
              <div className="font-bold text-warning">{match.odds.draw.toFixed(2)}</div>
            </div>
            <div className="bg-accent/10 rounded p-2 text-center">
              <div className="text-muted-foreground">2</div>
              <div className="font-bold text-accent">{match.odds.away.toFixed(2)}</div>
            </div>
          </div>
        )}
      </Card>
    </Link>
  )
}