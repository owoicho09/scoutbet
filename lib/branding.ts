// White-label branding configuration for ScoutBet

export const branding = {
  // Platform name (customizable for white-label)
  platformName: 'ScoutBet',
  tagline: 'Premium Football Betting Intelligence',

  // Logo (customizable)
  logoUrl: '',
  logoText: 'SB',

  // Contact & Social
  email: 'support@scoutbet.com',
  twitter: '@scoutbet',
  telegram: '@scoutbet_signals',

  // Color scheme (dark premium theme)
  colors: {
    // Background
    darkBg: '#0A0A0F', // Near black
    cardBg: '#1a1a20', // Card background
    borderColor: '#2a2a30', // Subtle borders
    hoverBg: '#25252d', // Hover state

    // Primary brand color
    primary: '#0084FF', // Electric Blue
    primaryLight: '#3da5ff',
    primaryDark: '#0055b3',

    // Accent colors
    accent: '#00FF88', // Neon Green
    accentDark: '#00cc6f',

    // Highlight
    highlight: '#FFA500', // Orange/Gold
    highlightLight: '#ffb84d',

    // Semantic colors
    success: '#00FF88',
    danger: '#FF3333',
    warning: '#FFA500',
    info: '#0084FF',

    // Text colors
    textPrimary: '#ffffff',
    textSecondary: '#a0a0a8',
    textTertiary: '#707078',

    // State colors
    positive: '#00FF88',
    negative: '#FF3333',
    neutral: '#707078',
  },

  // Typography
  fonts: {
    heading: 'system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
    mono: 'Menlo, Courier New, monospace',
  },

  // Subscription tiers
  tiers: {
    free: {
      name: 'Free',
      price: 0,
      features: [
        'Basic match intelligence',
        'Community leaderboard',
        'Up to 5 signals per day',
        'Basic odds builder',
        'Standard support',
      ],
    },
    vip: {
      name: 'VIP',
      price: 29,
      features: [
        'Advanced predictions',
        'Unlimited signals',
        'Advanced odds builder with accumulators',
        'Premium leaderboard',
        'Priority support',
        'Weekly masterclasses',
      ],
    },
    pro: {
      name: 'Pro',
      price: 99,
      features: [
        'Elite predictions',
        'Unlimited signals',
        'Advanced accumulator strategies',
        'Private Discord community',
        'Daily analysis calls',
        'API access',
        '24/7 dedicated support',
      ],
    },
  },
}
