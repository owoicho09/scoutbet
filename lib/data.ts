// Simulated data generators for ScoutBet platform

import { Club, Match, Leaderboard, Bet, Signal, User, Notification, KeyPlayer } from './types'

// Real football clubs
export const clubs: Club[] = [
  { id: '1', name: 'Manchester United', logo: '🔴', league: 'Premier League', country: 'England' },
  { id: '2', name: 'Manchester City', logo: '🔵', league: 'Premier League', country: 'England' },
  { id: '3', name: 'Liverpool', logo: '🔴', league: 'Premier League', country: 'England' },
  { id: '4', name: 'Arsenal', logo: '🔴', league: 'Premier League', country: 'England' },
  { id: '5', name: 'Chelsea', logo: '🔵', league: 'Premier League', country: 'England' },
  { id: '6', name: 'Tottenham', logo: '⚪', league: 'Premier League', country: 'England' },
  { id: '7', name: 'Real Madrid', logo: '⚪', league: 'La Liga', country: 'Spain' },
  { id: '8', name: 'Barcelona', logo: '🔴', league: 'La Liga', country: 'Spain' },
  { id: '9', name: 'Bayern Munich', logo: '🔴', league: 'Bundesliga', country: 'Germany' },
  { id: '10', name: 'PSG', logo: '🔴', league: 'Ligue 1', country: 'France' },
  { id: '11', name: 'AC Milan', logo: '🔴', league: 'Serie A', country: 'Italy' },
  { id: '12', name: 'Inter Milan', logo: '🔵', league: 'Serie A', country: 'Italy' },
  { id: '13', name: 'Juventus', logo: '⚪', league: 'Serie A', country: 'Italy' },
  { id: '14', name: 'Dortmund', logo: '💛', league: 'Bundesliga', country: 'Germany' },
  { id: '15', name: 'Atlético Madrid', logo: '🔴', league: 'La Liga', country: 'Spain' },
  { id: '16', name: 'Bournemouth', logo: '🍒', league: 'Premier League', country: 'England' },
]

// Deterministic random for consistent server/client rendering
const seededRandom = (seed: number): number => {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

const confidenceLevels: Array<'high' | 'medium' | 'low'> = ['high', 'medium', 'low']

const generateInsight = (
  home: string,
  away: string,
  winner: 'home' | 'draw' | 'away',
  btts: 'high' | 'medium' | 'low',
  over25: 'high' | 'medium' | 'low',
  xGHome: number,
  xGAway: number
): string => {
  const winnerLine =
    winner === 'home'
      ? `${home} are favoured to take all three points on home soil.`
      : winner === 'away'
      ? `${away} come into this as the stronger side and are tipped to edge it on the road.`
      : `This fixture looks evenly matched, with a draw a genuine possibility.`

  const bttsLine =
    btts === 'high'
      ? `Both sides have been prolific recently, making a goal at each end highly likely.`
      : btts === 'medium'
      ? `There is a reasonable chance both teams get on the scoresheet.`
      : `One side is likely to keep a clean sheet given their defensive solidity.`

  const goalLine =
    over25 === 'high'
      ? `Expect an open, high-scoring game — over 2.5 goals is strongly indicated (xG: ${xGHome.toFixed(1)} vs ${xGAway.toFixed(1)}).`
      : over25 === 'medium'
      ? `A moderate goal tally is projected, with xG figures of ${xGHome.toFixed(1)} and ${xGAway.toFixed(1)} suggesting a competitive contest.`
      : `Defensive discipline from both camps points to a tight, low-scoring affair (xG: ${xGHome.toFixed(1)} vs ${xGAway.toFixed(1)}).`

  return `${home} host ${away} in what promises to be a compelling fixture. ${winnerLine} ${bttsLine} ${goalLine}`
}

const buildRecommendedBet = (
  winner: 'home' | 'draw' | 'away',
  home: string,
  away: string,
  btts: 'high' | 'medium' | 'low',
  over25: 'high' | 'medium' | 'low'
): string => {
  const winLabel =
    winner === 'home' ? `${home} Win` : winner === 'away' ? `${away} Win` : 'Draw'
  if (over25 === 'high') return `${winLabel} & Over 2.5`
  if (btts === 'high') return `${winLabel} & BTTS`
  return winLabel
}

// Generate matches
export const generateMatches = (): Match[] => {
  const matchPairs = [
    [1, 2],   // Man United vs Man City
    [3, 4],   // Liverpool vs Arsenal
    [5, 6],   // Chelsea vs Tottenham
    [7, 8],   // Real Madrid vs Barcelona
    [9, 14],  // Bayern vs Dortmund
    [10, 11], // PSG vs AC Milan
    [12, 13], // Inter vs Juventus
    [2, 5],   // Man City vs Chelsea
    [1, 3],   // Man United vs Liverpool
    [4, 16],  // Arsenal vs Bournemouth
  ]

  return matchPairs.map((pair, idx) => {
    const seed1 = idx * 73
    const seed2 = idx * 137
    const seed3 = idx * 241
    const seed4 = idx * 313
    const seed5 = idx * 421
    const seed6 = idx * 503
    const seed7 = idx * 617
    const seed8 = idx * 719

    const homeWinProb = seededRandom(seed1) * 0.4 + 0.3
    const drawProb    = seededRandom(seed2) * 0.3 + 0.2
    const awayWinProb = seededRandom(seed3) * 0.4 + 0.2
    const xGHome      = seededRandom(seed4) * 2 + 1
    const xGAway      = seededRandom(seed5) * 1.8 + 0.8

    const maxProb = Math.max(homeWinProb, drawProb, awayWinProb)
    const predictedWinner: 'home' | 'draw' | 'away' =
      maxProb === homeWinProb ? 'home' : maxProb === awayWinProb ? 'away' : 'draw'

    const btts   = confidenceLevels[Math.floor(seededRandom(seed7) * 3)]
    const over25 = confidenceLevels[Math.floor(seededRandom(seed8) * 3)]

    const homeTeam = clubs[pair[0] - 1]
    const awayTeam = clubs[pair[1] - 1]

    const insight        = generateInsight(homeTeam.name, awayTeam.name, predictedWinner, btts, over25, xGHome, xGAway)
    const recommendedBet = buildRecommendedBet(predictedWinner, homeTeam.name, awayTeam.name, btts, over25)

    const generated = {
      id: `match-${idx}`,
      homeTeam,
      awayTeam,
      date: new Date(Date.now() + (idx + 1) * 86400000),
      league: homeTeam.league,
      homeWinProb,
      drawProb,
      awayWinProb,
      xGHome,
      xGAway,
      confidence: Math.floor(seededRandom(seed6) * 35) + 60,
      formHome: [1, 1, 0, 1, 1],
      formAway: [1, 1, 1, 0, 1],
      odds: {
        home: parseFloat((seededRandom(seed1 + 100) * 1.5 + 1.5).toFixed(2)),
        draw: parseFloat((seededRandom(seed2 + 100) * 0.8 + 3.0).toFixed(2)),
        away: parseFloat((seededRandom(seed3 + 100) * 1.5 + 2.0).toFixed(2)),
      },
      predictedWinner,
      btts,
      over25,
      insight,
      recommendedBet,
    }

    // Hardcoded override for Arsenal vs Bournemouth
    if (idx === 9) {
      return {
        ...generated,
        id: 'match-9',
        homeTeam: clubs[3],   // Arsenal
        awayTeam: clubs[15],  // Bournemouth
        date: new Date('2026-04-11'),
        league: 'Premier League',
        homeWinProb: 0.35,
        drawProb: 0.42,
        awayWinProb: 0.23,
        xGHome: 1.8,
        xGAway: 1.2,
        confidence: 78,
        formHome: [1, 0, 1, 0, 1],
        formAway: [0, 0, 0, 0, 0],
        odds: { home: 1.95, draw: 3.40, away: 4.20 },
        predictedWinner: 'draw' as const,
        btts: 'high' as const,
        over25: 'medium' as const,
        insight: `Arsenal host Bournemouth at the Emirates sitting top of the Premier League on 70 points, in a title-defining run-in. Bournemouth sit 13th, needing points to avoid slipping further down. Arsenal's last 5 is concerning — 3 wins but 2 losses, exactly the kind of inconsistency that feeds the narrative of Arsenal "bottling" big moments. Bournemouth's last 5 tells a different story: five draws in a row — defensively organised, hard to beat, compact but dangerous on the counter. H2H is split with goals in almost every fixture; 3 of the last 4 meetings went over 2.5 goals. The psychological weight of the title race combined with Bournemouth's draw-specialist form makes this a genuine banana-skin fixture.`,
        recommendedBet: 'Draw & BTTS Yes',
      }
    }

    return generated
  })
}

// Generate key players
export const generateKeyPlayers = (): KeyPlayer[] => {
  const names = [
    'Haaland',
    'Mbappé',
    'Salah',
    'Rodrygo',
    'Saka',
    'De Bruyne',
    'Benzema',
    'Lewandowski',
    'Vinicius Jr',
    'Son Heung-min',
  ]
  const positions = ['Forward', 'Midfielder', 'Defender', 'Winger']

  return names.map((name) => ({
    name,
    position: positions[Math.floor(Math.random() * positions.length)],
    impact: Math.random() * 0.4 + 0.5,
    team: Math.random() > 0.5 ? 'home' : 'away',
  }))
}

// Leaderboard data
export const leaderboard: Leaderboard[] = [
  { username: 'EliteAnalyst', badge: '🏆', wins: 247, losses: 53,  profit: 12450, accuracy: 82.3, roi: 127 },
  { username: 'OddsKing',     badge: '🥈', wins: 189, losses: 61,  profit: 8920,  accuracy: 75.6, roi: 89  },
  { username: 'FormReader',   badge: '🥉', wins: 156, losses: 44,  profit: 7650,  accuracy: 78.9, roi: 98  },
  { username: 'StatsMaster',  badge: '🎖️', wins: 198, losses: 72,  profit: 6780,  accuracy: 73.3, roi: 78  },
  { username: 'Predictor99',  badge: '🎖️', wins: 134, losses: 39,  profit: 5980,  accuracy: 77.4, roi: 91  },
  { username: 'ProBetter',    badge: '🎖️', wins: 167, losses: 58,  profit: 5420,  accuracy: 74.2, roi: 72  },
  { username: 'TrendSpotter', badge: '🎖️', wins: 143, losses: 42,  profit: 4890,  accuracy: 77.3, roi: 85  },
  { username: 'ValueHunter',  badge: '🎖️', wins: 128, losses: 35,  profit: 4560,  accuracy: 78.5, roi: 92  },
  { username: 'DataDriven',   badge: '🎖️', wins: 115, losses: 38,  profit: 3980,  accuracy: 75.2, roi: 68  },
  { username: 'SharpEye',     badge: '🎖️', wins: 98,  losses: 31,  profit: 3250,  accuracy: 76.0, roi: 76  },
]

// Signals feed
export const generateSignals = (): Signal[] => {
  const picks = [
    'Manchester City 1X',
    'Over 2.5 Goals',
    'Both Teams to Score',
    'Liverpool Win',
    'Barcelona -1',
    'Under 3.5 Goals',
    'Draw Both Halves',
    'Exact Score 2-1',
  ]

  return Array.from({ length: 15 }, (_, i) => {
    const seed1 = i * 67
    const seed2 = i * 89
    const seed3 = i * 101
    return {
      id: `signal-${i}`,
      match: `Match ${i + 1}`,
      pick: picks[Math.floor(seededRandom(seed1) * picks.length)],
      confidence: Math.floor(seededRandom(seed2) * 30) + 65,
      timestamp: new Date(Date.now() - seededRandom(seed3) * 3600000 * 4),
      author: leaderboard[Math.floor(seededRandom(seed1 + 50) * leaderboard.length)].username,
    }
  })
}

// User bets
export const generateBets = (): Bet[] => {
  return Array.from({ length: 20 }, (_, i) => {
    const seed1 = i * 131
    const seed2 = i * 151
    const seed3 = i * 167
    const seed4 = i * 179
    const seed5 = i * 191

    const result = seededRandom(seed1) > 0.5 ? 'win' : 'loss'
    const odds   = parseFloat((seededRandom(seed2) * 2 + 1.5).toFixed(2))
    const stake  = Math.floor(seededRandom(seed3) * 500) + 50
    const profit = result === 'win' ? stake * (odds - 1) : -stake

    return {
      id: `bet-${i}`,
      matchId: `match-${Math.floor(seededRandom(seed4) * 10)}`,
      pick: ['home', 'draw', 'away'][Math.floor(seededRandom(seed1 + 50) * 3)] as 'home' | 'draw' | 'away',
      odds,
      stake,
      date: new Date(Date.now() - seededRandom(seed5) * 86400000 * 30),
      result: i < 15 ? (result as 'win' | 'loss') : 'pending',
      profit: i < 15 ? profit : undefined,
    }
  })
}

// Current user
export const currentUser: User = {
  id: 'user-1',
  name: 'John Bettor',
  email: 'john@example.com',
  tier: 'vip',
  joinDate: new Date('2023-06-15'),
  stats: {
    totalBets: 145,
    wins: 112,
    accuracy: 77.2,
    profit: 4890,
  },
}

// Notifications
export const generateNotifications = (): Notification[] => {
  return [
    {
      id: '1',
      type: 'prediction',
      title: 'New Prediction Alert',
      message: 'Manchester City vs Liverpool: 78% confidence home win',
      timestamp: new Date(Date.now() - 300000),
      read: false,
    },
    {
      id: '2',
      type: 'leaderboard',
      title: 'Leaderboard Update',
      message: 'You moved up 5 positions to rank #15!',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
    {
      id: '3',
      type: 'signal',
      title: 'Signal from EliteAnalyst',
      message: 'Barcelona vs Real Madrid Over 2.5 - Confidence 85%',
      timestamp: new Date(Date.now() - 7200000),
      read: true,
    },
    {
      id: '4',
      type: 'result',
      title: 'Bet Result',
      message: 'Your Arsenal bet won! +$234 profit',
      timestamp: new Date(Date.now() - 10800000),
      read: true,
    },
    {
      id: '5',
      type: 'prediction',
      title: 'Premium Signal',
      message: 'Bayern Munich 1X Accumulator - VIP Exclusive',
      timestamp: new Date(Date.now() - 14400000),
      read: true,
    },
  ]
}