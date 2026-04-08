'use client'

import { generateBets } from '@/lib/data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'

export default function MyBets() {
  const allBets = generateBets()
  const [filter, setFilter] = useState('all')

  const filteredBets = allBets.filter((bet) => {
    if (filter === 'won') return bet.result === 'win'
    if (filter === 'lost') return bet.result === 'loss'
    if (filter === 'pending') return bet.result === 'pending'
    return true
  })

  const stats = {
    total: allBets.length,
    won: allBets.filter((b) => b.result === 'win').length,
    lost: allBets.filter((b) => b.result === 'loss').length,
    pending: allBets.filter((b) => b.result === 'pending').length,
    profit: allBets
      .filter((b) => b.result)
      .reduce((acc, b) => acc + (b.profit || 0), 0)
      .toFixed(2),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">My Bets</h1>
        <p className="text-muted-foreground">
          View and track all your bets and results
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">Total Bets</div>
          <div className="text-2xl font-bold text-foreground">{stats.total}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">Won</div>
          <div className="text-2xl font-bold text-success">{stats.won}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">Lost</div>
          <div className="text-2xl font-bold text-destructive">{stats.lost}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">Pending</div>
          <div className="text-2xl font-bold text-warning">{stats.pending}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs text-muted-foreground">Total Profit</div>
          <div className="text-2xl font-bold text-accent">+${stats.profit}</div>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-48 bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bets</SelectItem>
            <SelectItem value="won">Won Only</SelectItem>
            <SelectItem value="lost">Lost Only</SelectItem>
            <SelectItem value="pending">Pending Only</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bets Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 md:px-6 py-4 font-bold text-foreground">
                  Date
                </th>
                <th className="text-left px-4 md:px-6 py-4 font-bold text-foreground">
                  Match
                </th>
                <th className="text-left px-4 md:px-6 py-4 font-bold text-foreground">
                  Pick
                </th>
                <th className="text-right px-4 md:px-6 py-4 font-bold text-foreground">
                  Odds
                </th>
                <th className="text-right px-4 md:px-6 py-4 font-bold text-foreground">
                  Stake
                </th>
                <th className="text-right px-4 md:px-6 py-4 font-bold text-foreground">
                  Result
                </th>
                <th className="text-right px-4 md:px-6 py-4 font-bold text-foreground">
                  Profit/Loss
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBets.map((bet, idx) => {
                const resultColor =
                  bet.result === 'win'
                    ? 'bg-success/10'
                    : bet.result === 'loss'
                      ? 'bg-destructive/10'
                      : 'bg-warning/10'

                return (
                  <tr key={idx} className={`border-b border-border hover:bg-secondary ${resultColor}`}>
                    <td className="px-4 md:px-6 py-4 text-sm text-muted-foreground">
                      {new Date(bet.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <div className="font-medium text-foreground">Match {parseInt(bet.matchId.split('-')[1]) + 1}</div>
                    </td>
                    <td className="px-4 md:px-6 py-4">
                      <Badge variant="secondary" className="text-xs">
                        {bet.pick === 'home' ? '1' : bet.pick === 'away' ? '2' : 'X'}
                      </Badge>
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right font-bold text-foreground">
                      {bet.odds.toFixed(2)}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right text-foreground">${bet.stake}</td>
                    <td className="px-4 md:px-6 py-4 text-right">
                      {bet.result ? (
                        <Badge
                          className={
                            bet.result === 'win'
                              ? 'bg-success/20 text-success'
                              : 'bg-destructive/20 text-destructive'
                          }
                        >
                          {bet.result.toUpperCase()}
                        </Badge>
                      ) : (
                        <Badge className="bg-warning/20 text-warning">PENDING</Badge>
                      )}
                    </td>
                    <td className="px-4 md:px-6 py-4 text-right font-bold">
                      <span
                        className={
                          bet.profit && bet.profit > 0 ? 'text-success' : 'text-destructive'
                        }
                      >
                        {bet.profit ? (bet.profit > 0 ? '+' : '') + bet.profit.toFixed(2) : '-'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
