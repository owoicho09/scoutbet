'use client'

import { generateMatches } from '@/lib/data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'

export default function Accumulator() {
  // Simulated accumulator selection
  const matches = generateMatches().slice(0, 4)
  const combinedOdds = matches.reduce((acc, m) => acc * m.odds.home, 1).toFixed(2)
  const stake = 250

  const potentialWinnings = (stake * parseFloat(combinedOdds) - stake).toFixed(2)
  const totalReturns = (stake * parseFloat(combinedOdds)).toFixed(2)

  // Risk calculation
  const risk = Math.min(100, (matches.length * 25))
  const riskColor = risk > 75 ? 'bg-destructive' : risk > 50 ? 'bg-warning' : 'bg-success'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Accumulator Builder</h1>
        <p className="text-muted-foreground">
          Build and analyze your accumulators with advanced risk calculations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Selected Bets */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Your Accumulator</h2>
          <div className="space-y-3">
            {matches.map((match, idx) => (
              <Card key={match.id} className="p-4 border-l-4 border-l-primary">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge className="bg-primary/20 text-primary">{idx + 1}</Badge>
                      <span className="font-bold text-foreground">
                        {match.homeTeam.name} to Win
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {match.homeTeam.name} vs {match.awayTeam.name} • {match.league}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {match.odds.home.toFixed(2)}
                      </span>
                      <span className="text-xs text-muted-foreground">Odds</span>
                    </div>
                  </div>
                  <Badge className="bg-success/20 text-success">
                    {match.confidence}% Confidence
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div>
          <Card className="p-6 sticky top-24 space-y-4">
            <h3 className="text-lg font-bold text-foreground">Accumulator Summary</h3>

            {/* Odds */}
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Combined Odds</div>
              <div className="text-4xl font-bold text-primary">{combinedOdds}</div>
            </div>

            {/* Stake */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Stake ($)</label>
              <Input
                type="number"
                value={stake}
                readOnly
                className="bg-secondary border-border"
              />
            </div>

            {/* Returns */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Total Returns</div>
                <div className="text-2xl font-bold text-primary">${totalReturns}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground mb-1">Potential Profit</div>
                <div className="text-2xl font-bold text-accent">${potentialWinnings}</div>
              </div>
            </div>

            {/* Risk Gauge */}
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">Risk Level</span>
                <Badge className="text-xs">{Math.round(risk)}%</Badge>
              </div>
              <Progress value={risk} className="h-3" />
              <div className="text-xs text-muted-foreground">
                {risk > 75
                  ? 'High Risk - Multiple bets required'
                  : risk > 50
                    ? 'Medium Risk - Balanced portfolio'
                    : 'Low Risk - Steady approach'}
              </div>
            </div>

            {/* Probability */}
            <div className="border-t border-border pt-4 space-y-2">
              <div className="text-sm text-muted-foreground">Hit Probability</div>
              <div className="text-3xl font-bold text-warning">
                {(
                  Math.round(
                    matches.reduce((acc, m) => acc * (m.homeWinProb / 100), 1) * 1000
                  ) / 10
                ).toFixed(1)}
                %
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4">
              <Button className="w-full">Place Accumulator</Button>
              <Button variant="outline" className="w-full">
                Share Bet
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Accumulator Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">{matches.length}</div>
            <div className="text-sm text-muted-foreground">Selections</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">{combinedOdds}</div>
            <div className="text-sm text-muted-foreground">Total Odds</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-2">
              {Math.round(
                (matches.reduce((acc, m) => acc * m.homeWinProb, 1) * 100) / matches.length
              )}
              %
            </div>
            <div className="text-sm text-muted-foreground">Avg. Confidence</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
