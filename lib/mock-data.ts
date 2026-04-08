export interface League {
  id: string;
  name: string;
  country: string;
  logo?: string;
}

export interface Team {
  id: string;
  name: string;
  logo?: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  leagueId: string;
  leagueName: string;
  kickoffTime: string;
  prediction: {
    mainPick: string;
    confidence: number;
    riskLevel: 'low' | 'medium' | 'high';
    reason: string;
  };
  analysis?: {
    summary: string;
    keyPoints: string[];
  };
  stats?: {
    homeTeam: Record<string, string | number>;
    awayTeam: Record<string, string | number>;
  };
}

export const leagues: League[] = [
  { id: 'pl', name: 'Premier League', country: 'England' },
  { id: 'la-liga', name: 'La Liga', country: 'Spain' },
  { id: 'bundesliga', name: 'Bundesliga', country: 'Germany' },
  { id: 'serie-a', name: 'Serie A', country: 'Italy' },
  { id: 'ligue-1', name: 'Ligue 1', country: 'France' },
];

export const teams: Record<string, Team> = {
  liverpool: { id: 'liv', name: 'Liverpool' },
  chelsea: { id: 'che', name: 'Chelsea' },
  arsenal: { id: 'ars', name: 'Arsenal' },
  manchesterCity: { id: 'mci', name: 'Manchester City' },
  manchesterUnited: { id: 'mun', name: 'Manchester United' },
  tottenham: { id: 'tot', name: 'Tottenham Hotspur' },
  realMadrid: { id: 'rmf', name: 'Real Madrid' },
  barcelona: { id: 'fcb', name: 'Barcelona' },
  atletico: { id: 'atm', name: 'Atlético Madrid' },
  sevilla: { id: 'sev', name: 'Sevilla' },
  bayernMunich: { id: 'fcb-m', name: 'Bayern Munich' },
  borussiaDortmund: { id: 'bvb', name: 'Borussia Dortmund' },
  juventus: { id: 'juv', name: 'Juventus' },
  inter: { id: 'int', name: 'Inter Milan' },
  ac: { id: 'aca', name: 'AC Milan' },
  nantes: { id: 'fcn', name: 'FC Nantes' },
  monaco: { id: 'asm', name: 'AS Monaco' },
};

export const matches: Match[] = [
  {
    id: '1',
    homeTeam: teams.liverpool,
    awayTeam: teams.chelsea,
    leagueId: 'pl',
    leagueName: 'Premier League',
    kickoffTime: '2024-04-06T15:00:00Z',
    prediction: {
      mainPick: 'Over 2.5 Goals',
      confidence: 78,
      riskLevel: 'low',
      reason: 'Both teams averaging 1.8+ goals per game this season with attacking form',
    },
    analysis: {
      summary: "Liverpool's aggressive midfield approach matches perfectly against Chelsea's exposed defensive line. Recent form heavily favors the Reds, with 4 wins in last 5 matches.",
      keyPoints: [
        "Liverpool averaging 2.3 goals at Anfield this season",
        "Chelsea's defense has conceded 12 in last 6 away matches",
        "Head-to-head: Over 2.5 hit in 7 of last 10 encounters",
        "Weather conditions favor open, attacking football",
      ],
    },
    stats: {
      homeTeam: {
        'Possession': '58%',
        'Shots': 12.4,
        'Goals': 2.3,
        'xG': 1.87,
        'Corners': 5.2,
        'Win Rate': '65%',
      },
      awayTeam: {
        'Possession': '42%',
        'Shots': 8.2,
        'Goals': 1.5,
        'xG': 1.12,
        'Corners': 3.8,
        'Win Rate': '42%',
      },
    },
  },
  {
    id: '2',
    homeTeam: teams.realMadrid,
    awayTeam: teams.barcelona,
    leagueId: 'la-liga',
    leagueName: 'La Liga',
    kickoffTime: '2024-04-07T20:00:00Z',
    prediction: {
      mainPick: 'Both Teams To Score',
      confidence: 85,
      riskLevel: 'low',
      reason: 'El Clásico historically produces goals; 9 of last 10 matches had both teams scoring',
    },
    analysis: {
      summary: "Classic matchup with both sides in strong attacking form. Real Madrid's counter-attack prowess meets Barcelona's fluid passing game.",
      keyPoints: [
        "Barcelona scoring 2+ goals in 6 of last 7 away matches",
        "Real Madrid conceding in all 8 home matches this season",
        "Historical BTTS rate in El Clásico: 82%",
      ],
    },
    stats: {
      homeTeam: {
        'Possession': '52%',
        'Shots': 11.2,
        'Goals': 2.1,
        'xG': 1.76,
        'Corners': 4.9,
        'Win Rate': '72%',
      },
      awayTeam: {
        'Possession': '48%',
        'Shots': 9.8,
        'Goals': 1.9,
        'xG': 1.54,
        'Corners': 4.2,
        'Win Rate': '68%',
      },
    },
  },
  {
    id: '3',
    homeTeam: teams.bayernMunich,
    awayTeam: teams.borussiaDortmund,
    leagueId: 'bundesliga',
    leagueName: 'Bundesliga',
    kickoffTime: '2024-04-07T15:30:00Z',
    prediction: {
      mainPick: 'Home Win',
      confidence: 72,
      riskLevel: 'low',
      reason: "Bayern's dominance at home with 8W-1D record; Dortmund 0-2-3 on road",
    },
    analysis: {
      summary: "Der Klassiker features Bayern in peak form at home against Dortmund's struggling away form.",
      keyPoints: [
        "Bayern unbeaten at Allianz Arena this season",
        "Dortmund's away record is one of Bundesliga's worst",
        "Bayern won 3-1 and 2-0 in last two meetings",
      ],
    },
    stats: {
      homeTeam: {
        'Possession': '61%',
        'Shots': 13.1,
        'Goals': 2.4,
        'xG': 2.01,
        'Corners': 5.5,
        'Win Rate': '78%',
      },
      awayTeam: {
        'Possession': '39%',
        'Shots': 7.3,
        'Goals': 1.2,
        'xG': 0.89,
        'Corners': 3.1,
        'Win Rate': '35%',
      },
    },
  },
  {
    id: '4',
    homeTeam: teams.juventus,
    awayTeam: teams.ac,
    leagueId: 'serie-a',
    leagueName: 'Serie A',
    kickoffTime: '2024-04-06T18:00:00Z',
    prediction: {
      mainPick: 'Under 2.5 Goals',
      confidence: 68,
      riskLevel: 'medium',
      reason: 'Defensive matchup; both teams averaging under 1.5 goals in recent form',
    },
    analysis: {
      summary: 'Traditional Serie A defensive battle. Both clubs emphasizing tactical discipline with lower scoring outputs.',
      keyPoints: [
        "Combined average goals: 2.8 per match",
        "Juventus last 5: 1.2 goals average",
        "AC Milan's defense has tightened recently",
      ],
    },
    stats: {
      homeTeam: {
        'Possession': '55%',
        'Shots': 9.8,
        'Goals': 1.4,
        'xG': 1.23,
        'Corners': 4.1,
        'Win Rate': '58%',
      },
      awayTeam: {
        'Possession': '45%',
        'Shots': 7.2,
        'Goals': 1.3,
        'xG': 1.01,
        'Corners': 3.6,
        'Win Rate': '48%',
      },
    },
  },
  {
    id: '5',
    homeTeam: teams.monaco,
    awayTeam: teams.nantes,
    leagueId: 'ligue-1',
    leagueName: 'Ligue 1',
    kickoffTime: '2024-04-07T19:00:00Z',
    prediction: {
      mainPick: 'Over 2.5 Goals',
      confidence: 74,
      riskLevel: 'low',
      reason: 'Monaco consistently high-scoring at home; Nantes weak away record',
    },
    analysis: {
      summary: "Monaco's attacking prowess should exploit Nantes' defensive vulnerabilities. Strong form advantage.",
      keyPoints: [
        "Monaco scoring 2.2+ goals per home game",
        "Nantes averaging 2.1 goals conceded away",
        "Head-to-head: 4 of 5 last meetings over 2.5 goals",
      ],
    },
    stats: {
      homeTeam: {
        'Possession': '59%',
        'Shots': 11.6,
        'Goals': 2.2,
        'xG': 1.89,
        'Corners': 5.0,
        'Win Rate': '64%',
      },
      awayTeam: {
        'Possession': '41%',
        'Shots': 6.9,
        'Goals': 1.1,
        'xG': 0.84,
        'Corners': 3.2,
        'Win Rate': '36%',
      },
    },
  },
];

export const getMatchesByLeague = (leagueId: string): Match[] => {
  return matches.filter((match) => match.leagueId === leagueId);
};

export const getMatchById = (id: string): Match | undefined => {
  return matches.find((match) => match.id === id);
};

export const getTopPick = (leagueId?: string): Match => {
  const filtered = leagueId ? getMatchesByLeague(leagueId) : matches;
  return filtered.reduce((top, current) =>
    current.prediction.confidence > top.prediction.confidence ? current : top
  );
};
