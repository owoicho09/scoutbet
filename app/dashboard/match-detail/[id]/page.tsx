'use client'

import { useState, use } from 'react'
import { generateMatches } from '@/lib/data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function MatchDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [selectedBet, setSelectedBet] = useState<'home' | 'draw' | 'away' | null>(null)
  const matches = generateMatches()
  const match = matches.find((m) => m.id === id) || matches[0]

  const matchIndex = parseInt(match.id.replace('match-', ''))

  // Form Scores
  const homeFormScore = match.formHome.filter(Boolean).length
  const awayFormScore = match.formAway.filter(Boolean).length

  // H2H
  const h2hMatches = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    home: Math.floor(seededRandom(matchIndex * 100 + i * 17) * 4),
    away: Math.floor(seededRandom(matchIndex * 100 + i * 31) * 4),
  }))

  // Generate full league table
  const totalTeams = 10
  const leagueTable = Array.from({ length: totalTeams }).map((_, i) => {
    const base = matchIndex * 1000 + i
    const teamName =
      i === 0
        ? match.homeTeam.name
        : i === 1
        ? match.awayTeam.name
        : `Team ${i + 1}`
    const played = 30
    const wins = Math.floor(seededRandom(base * 11) * 20)
    const draws = Math.floor(seededRandom(base * 13) * (played - wins))
    const losses = played - wins - draws
    const goalsFor = Math.floor(seededRandom(base * 17) * 50 + 20)
    const goalsAgainst = Math.floor(seededRandom(base * 19) * 50 + 20)
    const gd = goalsFor - goalsAgainst
    const points = wins * 3 + draws
    return { position: i + 1, team: teamName, played, wins, draws, losses, goalsFor, goalsAgainst, gd, points }
  })

  const renderForm = (form: boolean[]) =>
    form.map((win, i) => (
      <span
        key={i}
        className={`px-2 py-1 rounded text-xs font-bold ${
          win ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
        }`}
      >
        {win ? 'W' : 'L'}
      </span>
    ))

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/20 to-secondary">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground mb-2">
              {new Date(match.date).toLocaleDateString()} • {match.league}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {match.homeTeam.name} vs {match.awayTeam.name}
            </h1>
          </div>
          <Badge className="bg-primary/20 text-primary">{match.confidence}% Confidence</Badge>
        </div>
      </Card>

      {/* Prediction Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insight */}
        <div className="lg:col-span-3">
          <Card className="p-6 border-l-4 border-l-primary bg-secondary/40">
            <p className="text-muted-foreground leading-relaxed">{match.insight}</p>
          </Card>
        </div>

        {/* Winner */}
        <Card className="p-6 ring-2 ring-primary">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Predicted winner</div>
          <div className="text-2xl font-bold text-primary">
            {match.predictedWinner === 'home'
              ? match.homeTeam.name
              : match.predictedWinner === 'away'
              ? match.awayTeam.name
              : 'Draw'}
          </div>
        </Card>

        {/* BTTS */}
        <Card className="p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Both teams to score</div>
          <Badge
            className={
              match.btts === 'high'
                ? 'bg-success/20 text-success'
                : match.btts === 'medium'
                ? 'bg-yellow-500/20 text-yellow-600'
                : 'bg-destructive/20 text-destructive'
            }
          >
            {match.btts}
          </Badge>
        </Card>

        {/* Over 2.5 */}
        <Card className="p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Over 2.5 goals</div>
          <Badge
            className={
              match.over25 === 'high'
                ? 'bg-success/20 text-success'
                : match.over25 === 'medium'
                ? 'bg-yellow-500/20 text-yellow-600'
                : 'bg-destructive/20 text-destructive'
            }
          >
            {match.over25}
          </Badge>
        </Card>

        {/* Recommended Bet */}
        <div className="lg:col-span-3">
          <Card className="p-6 bg-primary/10 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Recommended bet</div>
              <div className="text-xl font-bold text-primary">{match.recommendedBet}</div>
            </div>
            <Badge className="bg-primary/20 text-primary text-sm">{match.confidence}% Confidence</Badge>
          </Card>
        </div>
      </div>

      {/* AI Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold mb-3">{match.homeTeam.name} AI Summary</h3>
          <p className="text-muted-foreground">
            Recent attacking metrics show strong performance with projected scoring pressure near{' '}
            <span className="text-primary font-bold">{match.xGHome.toFixed(1)} xG</span>. Home advantage and recent
            form strength ({homeFormScore}/5 wins) indicate stable attacking rhythm.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold mb-3">{match.awayTeam.name} AI Summary</h3>
          <p className="text-muted-foreground">
            Defensive workload remains high with expected concession near{' '}
            <span className="text-accent font-bold">{match.xGAway.toFixed(1)} xGA</span>. Recent form ({awayFormScore}
            /5 wins) suggests moderate resilience under pressure.
          </p>
        </Card>
      </div>

      {/* H2H + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* H2H */}
        <Card className="p-6">
          <h3 className="font-bold mb-4">Head-to-Head (Last 5)</h3>
          <div className="space-y-2">
            {h2hMatches.map((m) => (
              <div key={m.id} className="flex justify-between text-sm">
                <span>{match.homeTeam.name}</span>
                <span className="font-bold">
                  {m.home} - {m.away}
                </span>
                <span>{match.awayTeam.name}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Form */}
        <Card className="p-6">
          <h3 className="font-bold mb-4">Recent Form</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">{match.homeTeam.name}</span>
              <div className="flex gap-1">{renderForm(match.formHome)}</div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">{match.awayTeam.name}</span>
              <div className="flex gap-1">{renderForm(match.formAway)}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Full League Table */}
      <Card className="p-6 overflow-x-auto">
        <h3 className="font-bold mb-4">League Table</h3>
        <table className="w-full text-sm table-auto border-collapse">
          <thead>
            <tr className="text-left border-b border-border">
              <th className="px-2 py-1">Pos</th>
              <th className="px-2 py-1">Team</th>
              <th className="px-2 py-1">P</th>
              <th className="px-2 py-1">W</th>
              <th className="px-2 py-1">D</th>
              <th className="px-2 py-1">L</th>
              <th className="px-2 py-1">GF</th>
              <th className="px-2 py-1">GA</th>
              <th className="px-2 py-1">GD</th>
              <th className="px-2 py-1">Pts</th>
            </tr>
          </thead>
          <tbody>
            {leagueTable.map((team) => {
              const isHome = team.team === match.homeTeam.name
              const isAway = team.team === match.awayTeam.name
              return (
                <tr
                  key={team.position}
                  className={`border-b border-border ${
                    isHome ? 'bg-primary/10' : isAway ? 'bg-accent/10' : ''
                  }`}
                >
                  <td className="px-2 py-1">{team.position}</td>
                  <td className="px-2 py-1 font-medium">{team.team}</td>
                  <td className="px-2 py-1">{team.played}</td>
                  <td className="px-2 py-1">{team.wins}</td>
                  <td className="px-2 py-1">{team.draws}</td>
                  <td className="px-2 py-1">{team.losses}</td>
                  <td className="px-2 py-1">{team.goalsFor}</td>
                  <td className="px-2 py-1">{team.goalsAgainst}</td>
                  <td className="px-2 py-1">{team.gd}</td>
                  <td className="px-2 py-1 font-bold">{team.points}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button size="lg" className="flex-1">
          Add to Prediction Slip
        </Button>
        <Button variant="outline" size="lg" className="flex-1">
          Share Analysis
        </Button>
      </div>
    </div>
  )
}