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
  const homeWinProb = Math.round(match.homeWinProb * 100)
  const drawProb = Math.round(match.drawProb * 100)
  const awayWinProb = Math.round(match.awayWinProb * 100)

  const confidenceColor =
    match.confidence >= 80
      ? 'bg-success/20 text-success'
      : match.confidence >= 70
        ? 'bg-primary/20 text-primary'
        : 'bg-warning/20 text-warning'

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

        {/* Prediction Bars */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium w-12 text-foreground">Home</span>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${homeWinProb}%` }}
              />
            </div>
            <span className="text-xs font-bold w-8 text-right text-foreground">{homeWinProb}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium w-12 text-foreground">Draw</span>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-warning transition-all"
                style={{ width: `${drawProb}%` }}
              />
            </div>
            <span className="text-xs font-bold w-8 text-right text-foreground">{drawProb}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium w-12 text-foreground">Away</span>
            <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: `${awayWinProb}%` }}
              />
            </div>
            <span className="text-xs font-bold w-8 text-right text-foreground">{awayWinProb}%</span>
          </div>
        </div>

        {/* XG Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-xs text-center border-t border-border pt-3">
          <div>
            <div className="text-muted-foreground">xG</div>
            <div className="font-bold text-foreground">{match.xGHome.toFixed(1)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">xGA</div>
            <div className="font-bold text-foreground">{match.xGAway.toFixed(1)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">Confidence</div>
            <div className="font-bold text-primary">{match.confidence}%</div>
          </div>
        </div>

        {/* Odds */}
        {showOdds && (
          <div className="grid grid-cols-3 gap-2 text-xs">
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
