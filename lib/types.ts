// Core types for ScoutBet platform

export interface Club {
  id: string
  name: string
  logo: string
  league: string
  country: string
}

export interface Match {
  id: string
  homeTeam: Club
  awayTeam: Club
  date: Date
  league: string
  homeWinProb: number
  drawProb: number
  awayWinProb: number
  xGHome: number
  xGAway: number
  confidence: number
  formHome: number[]
  formAway: number[]
  odds: {
    home: number
    draw: number
    away: number
  }
}

export interface MatchDetail extends Match {
  keyPlayers: KeyPlayer[]
  prediction: {
    home: number
    draw: number
    away: number
  }
}

export interface KeyPlayer {
  name: string
  position: string
  impact: number
  team: 'home' | 'away'
}

export interface Leaderboard {
  username: string
  badge?: string
  wins: number
  losses: number
  profit: number
  accuracy: number
  roi: number
}

export interface Bet {
  id: string
  matchId: string
  pick: 'home' | 'draw' | 'away'
  odds: number
  stake: number
  date: Date
  result?: 'win' | 'loss' | 'pending'
  profit?: number
}

export interface Signal {
  id: string
  match: string
  pick: string
  confidence: number
  timestamp: Date
  author: string
}

export interface User {
  id: string
  name: string
  email: string
  tier: 'free' | 'vip' | 'pro'
  joinDate: Date
  stats: {
    totalBets: number
    wins: number
    accuracy: number
    profit: number
  }
}

export interface Notification {
  id: string
  type: 'prediction' | 'leaderboard' | 'signal' | 'result'
  title: string
  message: string
  timestamp: Date
  read: boolean
}
