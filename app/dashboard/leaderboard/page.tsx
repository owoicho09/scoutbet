'use client'

import { useState } from 'react'
import { leaderboard } from '@/lib/data'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState('all-time')
  const [sortBy, setSortBy] = useState<'profit' | 'accuracy'>('profit')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLeaderboard = leaderboard
    .filter((user) => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'profit') {
        return b.profit - a.profit
      } else {
        return b.accuracy - a.accuracy
      }
    })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Leaderboard</h1>
        <p className="text-muted-foreground">
          Top analysts and their performance metrics
        </p>
      </div>

      {/* Controls */}
      <Card className="p-4 md:p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Search User</label>
            <Input
              placeholder="Search by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          {/* Timeframe */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Timeframe</label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="all-time">All Time</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as 'profit' | 'accuracy')}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="profit">Total Profit</SelectItem>
                <SelectItem value="accuracy">Accuracy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 md:px-6 py-4 font-bold text-foreground">Rank</th>
                <th className="text-left px-4 md:px-6 py-4 font-bold text-foreground">Username</th>
                <th className="text-right px-4 md:px-6 py-4 font-bold text-foreground">Wins</th>
                <th className="text-right px-4 md:px-6 py-4 font-bold text-foreground">Losses</th>
                <th className="text-right px-4 md:px-6 py-4 font-bold text-foreground">Accuracy</th>
                <th className="text-right px-4 md:px-6 py-4 font-bold text-foreground">Profit</th>
                <th className="text-right px-4 md:px-6 py-4 font-bold text-foreground">ROI</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaderboard.map((user, idx) => (
                <tr
                  key={idx}
                  className={`border-b border-border hover:bg-secondary transition-colors ${
                    idx === 0 ? 'bg-primary/5' : ''
                  }`}
                >
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={idx === 0 ? 'default' : 'secondary'}
                        className="w-8 h-8 flex items-center justify-center p-0"
                      >
                        {idx + 1}
                      </Badge>
                      {user.badge && <span>{user.badge}</span>}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <div className="font-bold text-foreground">{user.username}</div>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <span className="text-success font-bold">{user.wins}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <span className="text-destructive font-bold">{user.losses}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <span className="text-primary font-bold">{user.accuracy}%</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <span className="text-accent font-bold">+${user.profit.toLocaleString()}</span>
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    <span className={user.roi > 100 ? 'text-success' : 'text-muted-foreground'}>
                      {user.roi}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Average Accuracy</div>
          <div className="text-4xl font-bold text-primary">
            {(
              leaderboard.reduce((acc, u) => acc + u.accuracy, 0) / leaderboard.length
            ).toFixed(1)}
            %
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Total Bets Won</div>
          <div className="text-4xl font-bold text-success">
            {leaderboard.reduce((acc, u) => acc + u.wins, 0).toLocaleString()}
          </div>
        </Card>
        <Card className="p-6">
          <div className="text-sm text-muted-foreground mb-2">Community Profit</div>
          <div className="text-4xl font-bold text-accent">
            ${leaderboard.reduce((acc, u) => acc + u.profit, 0).toLocaleString()}
          </div>
        </Card>
      </div>
    </div>
  )
}
