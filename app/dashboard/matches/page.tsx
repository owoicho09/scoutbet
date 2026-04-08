'use client'

import { useState } from 'react'
import { generateMatches } from '@/lib/data'
import { MatchCard } from '@/components/widgets/match-card'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Matches() {
  const allMatches = generateMatches()
  const [selectedLeague, setSelectedLeague] = useState('all')
  const [minConfidence, setMinConfidence] = useState('60')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredMatches = allMatches.filter((match) => {
    const leagueMatch = selectedLeague === 'all' || match.league === selectedLeague
    const confidenceMatch = match.confidence >= parseInt(minConfidence)
    const searchMatch =
      match.homeTeam.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      match.awayTeam.name.toLowerCase().includes(searchTerm.toLowerCase())
    return leagueMatch && confidenceMatch && searchMatch
  })

  const leagues = ['all', ...new Set(allMatches.map((m) => m.league))]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">All Matches</h1>
        <p className="text-muted-foreground">
          Browse upcoming matches with AI-powered predictions and odds
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4 md:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
            <Input
              placeholder="Search teams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          {/* League Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">League</label>
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {leagues.map((league) => (
                  <SelectItem key={league} value={league}>
                    {league === 'all' ? 'All Leagues' : league}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Confidence Filter */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Min. Confidence
            </label>
            <Select value={minConfidence} onValueChange={setMinConfidence}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">60%+</SelectItem>
                <SelectItem value="70">70%+</SelectItem>
                <SelectItem value="80">80%+</SelectItem>
                <SelectItem value="90">90%+</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters */}
          <div className="flex items-end">
            <Button
              variant="outline"
              onClick={() => {
                setSelectedLeague('all')
                setMinConfidence('60')
                setSearchTerm('')
              }}
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </Card>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {filteredMatches.length} of {allMatches.length} matches
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary">{filteredMatches.length} Matches</Badge>
        </div>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => <MatchCard key={match.id} match={match} />)
        ) : (
          <div className="col-span-full">
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-lg mb-4">No matches found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedLeague('all')
                  setMinConfidence('60')
                  setSearchTerm('')
                }}
              >
                Clear Filters
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
