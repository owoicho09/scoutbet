'use client'

import Link from 'next/link'
import {
  generateMatches,
  generateSignals,
  leaderboard,
} from '@/lib/data'

import { MatchCard } from '@/components/widgets/match-card'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

import {
  Activity,
  Trophy,
  TrendingUp,
  Target,
  Radio,
} from 'lucide-react'

export default function DashboardHome() {
  const matches = generateMatches().slice(0, 3)
  const signals = generateSignals().slice(0, 5)
  const topLeaderboard = leaderboard.slice(0, 5)

  return (
    <div className="space-y-6">

      {/* Hero Section */}
      <Card className="bg-gradient-to-r from-primary/20 to-accent/20 border-primary/30 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Match Intelligence Hub
            </h1>

            <p className="text-muted-foreground max-w-xl">
              AI-powered predictions for today's matches.
              Analyze odds, track signals, and build
              high-confidence betting strategies.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <Link href="/dashboard/matches">
              <Button>
                View All Matches
              </Button>
            </Link>

            <Link href="/dashboard/odds-builder">
              <Button variant="secondary">
                Build Bet
              </Button>
            </Link>

          </div>

        </div>
      </Card>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <Card className="p-4 flex items-center gap-3">
          <Activity className="text-primary" size={20} />
          <div>
            <div className="text-xs text-muted-foreground">
              Live bet Today
            </div>
            <div className="font-bold text-lg">
              {signals.length}
            </div>
          </div>
        </Card>

        <Card className="p-4 flex items-center gap-3">
          <Target className="text-primary" size={20} />
          <div>
            <div className="text-xs text-muted-foreground">
              Active Matches
            </div>
            <div className="font-bold text-lg">
              {matches.length}
            </div>
          </div>
        </Card>



        <Card className="p-4 flex items-center gap-3">
          <Trophy className="text-primary" size={20} />
          <div>
            <div className="text-xs text-muted-foreground">
              Accuracy
            </div>
            <div className="font-bold text-lg">
              77.2%
            </div>
          </div>
        </Card>

      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Featured Matches */}
        <div className="lg:col-span-2 space-y-4">

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              Today's Top Matches
            </h2>
          </div>

          <div className="grid gap-4">

            {matches.length > 0 ? (
              matches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                />
              ))
            ) : (
              <Card className="p-6 text-center text-muted-foreground">
                No matches available.
              </Card>
            )}

          </div>

          <Link
            href="/dashboard/matches"
            className="inline-block"
          >
            <Button
              variant="outline"
              className="w-full"
            >
              View All Matches
            </Button>
          </Link>

        </div>

        {/* Right Column */}
        <div className="space-y-4">

          {/* Leaderboard Preview */}
          <div>

            <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Trophy size={18} />
              Top Analysts
            </h3>

            <Card className="p-4">

              <div className="space-y-3">

                {topLeaderboard.map((user, idx) => (

                  <div
                    key={idx}
                    className="flex items-center justify-between"
                  >

                    <div className="flex items-center gap-2">

                      <div className="text-sm font-bold text-primary w-6">
                        {idx + 1}
                      </div>

                      <div className="flex-1 min-w-0">

                        <div className="text-sm font-medium truncate">
                          {user.username}
                        </div>

                        <div className="text-xs text-muted-foreground">
                          {user.accuracy}% accuracy
                        </div>

                      </div>

                    </div>

                    <div className="text-right">

                      <div className="text-sm font-bold text-accent">
                        +${user.profit}
                      </div>

                    </div>

                  </div>

                ))}

              </div>

              <Link
                href="/dashboard/leaderboard"
                className="inline-block mt-4 w-full"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  View Full Leaderboard
                </Button>
              </Link>

            </Card>

          </div>

          {/* Quick Stats */}
          <div>

            <h3 className="text-lg font-bold text-foreground mb-3">
              Your Stats
            </h3>

            <Card className="p-4 space-y-3">

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Wins
                </span>
                <span className="text-lg font-bold text-success">
                  112
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Losses
                </span>
                <span className="text-lg font-bold text-destructive">
                  33
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Accuracy
                </span>
                <span className="text-lg font-bold text-primary">
                  77.2%
                </span>
              </div>

              <div className="flex justify-between items-center border-t border-border pt-3">
                <span className="text-sm text-muted-foreground">
                  Profit
                </span>
                <span className="text-lg font-bold text-accent">
                  +$4,890
                </span>
              </div>

            </Card>

          </div>

        </div>

      </div>

      {/* Live Signals Feed */}
      <div>

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Radio size={20} />
            Live bet Feed
          </h2>

          <Badge className="bg-success/20 text-success">
            LIVE
          </Badge>

        </div>

        <div className="grid gap-3 max-h-[420px] overflow-y-auto pr-1">

          {signals.length > 0 ? (

            signals.map((signal) => (

              <Card
                key={signal.id}
                className="p-4 hover:bg-secondary transition-colors"
              >

                <div className="flex items-start justify-between gap-4">

                  <div className="flex-1">

                    <div className="flex items-center gap-2 mb-1">

                      <div className="font-medium text-foreground">
                        {signal.author}
                      </div>

                      <Badge
                        variant="secondary"
                        className={`${
                          signal.confidence >= 80
                            ? 'bg-success/20 text-success'
                            : 'bg-primary/20 text-primary'
                        }`}
                      >
                        {signal.confidence}%
                      </Badge>

                    </div>

                    <p className="text-sm text-muted-foreground mb-1">
                      {signal.match}
                    </p>

                    <p className="text-sm font-bold text-foreground">
                      {signal.pick}
                    </p>

                  </div>

                  <div className="text-right">

                    <div className="text-xs text-muted-foreground">
                      {signal.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>

                  </div>

                </div>

              </Card>

            ))

          ) : (

            <Card className="p-6 text-center text-muted-foreground">
              No live signals available.
            </Card>

          )}

        </div>

        <Link
          href="/dashboard/signals"
          className="inline-block mt-4"
        >

          <Button
            variant="outline"
            className="w-full"
          >
            View All Live Bet
          </Button>

        </Link>

      </div>

    </div>
  )
}