'use client'

import { useState, use } from 'react'
import { generateMatches } from '@/lib/data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function MatchDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [selectedBet, setSelectedBet] = useState<'home' | 'draw' | 'away' | null>(null)
  const matches = generateMatches()
  const match = matches.find((m) => m.id === id) || matches[0]

  // Form Scores
  const homeFormScore = match.formHome.filter(Boolean).length
  const awayFormScore = match.formAway.filter(Boolean).length

  // H2H
  const h2hMatches = Array.from({ length: 5 }).map((_, i) => ({
    id: i,
    home: Math.floor(Math.random() * 4),
    away: Math.floor(Math.random() * 4),
  }))

  // Generate full league table
  const totalTeams = 10
  const leagueTable = Array.from({ length: totalTeams }).map((_, i) => {
    const teamName =
      i === 0
        ? match.homeTeam.name
        : i === 1
        ? match.awayTeam.name
        : `Team ${i + 1}`
    const played = 30
    const wins = Math.floor(Math.random() * 20)
    const draws = Math.floor(Math.random() * (played - wins))
    const losses = played - wins - draws
    const goalsFor = Math.floor(Math.random() * 50 + 20)
    const goalsAgainst = Math.floor(Math.random() * 50 + 20)
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Home Win', value: Math.round(match.homeWinProb * 100), odds: match.odds.home, type: 'home' },
          { label: 'Draw', value: Math.round(match.drawProb * 100), odds: match.odds.draw, type: 'draw' },
          { label: 'Away Win', value: Math.round(match.awayWinProb * 100), odds: match.odds.away, type: 'away' },
        ].map((pred) => (
          <Card
            key={pred.type}
            className={`p-6 cursor-pointer ${selectedBet === pred.type ? 'ring-2 ring-primary' : 'hover:bg-secondary'}`}
            onClick={() => setSelectedBet(selectedBet === pred.type ? null : pred.type)}
          >
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">{pred.label}</div>
              <div className="text-4xl font-bold text-primary">{pred.value}%</div>
              <div className="text-lg font-bold">{pred.odds.toFixed(2)}</div>
              <Progress value={pred.value} className="h-2" />
            </div>
          </Card>
        ))}
      </div>

      {/* AI Summaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-bold mb-3">{match.homeTeam.name} AI Summary</h3>
          <p className="text-muted-foreground">
            Recent attacking metrics show strong performance with projected scoring pressure near{' '}
            <span className="text-primary font-bold">{match.xGHome.toFixed(1)} xG</span>. Home advantage and recent form strength ({homeFormScore}/5 wins) indicate stable attacking rhythm.
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="font-bold mb-3">{match.awayTeam.name} AI Summary</h3>
          <p className="text-muted-foreground">
            Defensive workload remains high with expected concession near{' '}
            <span className="text-accent font-bold">{match.xGAway.toFixed(1)} xGA</span>. Recent form ({awayFormScore}/5 wins) suggests moderate resilience under pressure.
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