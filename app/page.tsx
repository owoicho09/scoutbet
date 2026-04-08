'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { branding } from '@/lib/branding'
import { generateMatches, leaderboard } from '@/lib/data'
import { MatchCard } from '@/components/widgets/match-card'

import {
  Target,
  BarChart3,
  Trophy,
  Radio,
  DollarSign,
  Zap,
  Rocket,
  CheckCircle,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react'

export default function Landing() {
  const matches = generateMatches().slice(0, 3)
  const topLeaderboard = leaderboard.slice(0, 3)

  const features = [
    {
      icon: Target,
      title: 'AI-Powered Predictions',
      description:
        'Advanced statistical models analyze team form, player data, and match dynamics for high-confidence predictions.',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description:
        'Live xG modeling, trend analysis, and match intelligence dashboards for smarter decision making.',
    },
    {
      icon: Trophy,
      title: 'Leaderboard System',
      description:
        'Track top analysts, measure betting performance, and compete within a transparent ecosystem.',
    },
    {
      icon: Radio,
      title: 'Premium Signals',
      description:
        'Receive curated VIP predictions backed by transparent confidence metrics.',
    },
    {
      icon: DollarSign,
      title: 'Odds Builder',
      description:
        'Construct single bets and accumulators with dynamic odds and automated risk scoring.',
    },
    {
      icon: Zap,
      title: 'High-Speed Intelligence',
      description:
        'Predictions refresh continuously to reflect live market and performance shifts.',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-card border-b border-border z-40 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold shadow-md"
              style={{ backgroundColor: branding.colors.primary }}
            >
              {branding.logoText}
            </div>

            <div className="hidden sm:block">
              <div className="font-bold text-foreground">
                {branding.platformName}
              </div>
              <div className="text-xs text-muted-foreground">
                {branding.tagline}
              </div>
            </div>
          </Link>

          <div className="flex gap-2 md:gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>

            <Link href="/login">
              <Button>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 md:px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center space-y-6 relative">

          <Badge
            variant="secondary"
            className="bg-primary/20 text-primary mx-auto flex items-center gap-2 w-fit"
          >
            <Rocket size={14} />
            Sports betting Intelligence Platform
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
            Premium Football Betting Intelligence
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Data-driven predictions, live match intelligence, and transparent betting analytics.
            Make smarter betting decisions with{' '}
            <span className="text-primary font-semibold">
              {branding.platformName}
            </span>.
          </p>

          {/* Trust Stats */}
          <div className="flex flex-wrap justify-center gap-6 pt-4 text-sm text-muted-foreground">

            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-primary" />
              <span>92.4% Model Accuracy</span>
            </div>

            <div className="flex items-center gap-2">
              <TrendingUp size={16} className="text-primary" />
              <span>50+ Leagues Covered</span>
            </div>

            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-primary" />
              <span>Verified Performance Metrics</span>
            </div>

          </div>

          <div className="flex gap-4 justify-center flex-wrap pt-6">

            <Link href="/login">
              <Button
                size="lg"
                className="text-base shadow-lg hover:shadow-primary/40"
              >
                Start Free Trial
              </Button>
            </Link>

            <Link href="#features">
              <Button
                size="lg"
                variant="outline"
                className="text-base"
              >
                Explore Features
              </Button>
            </Link>

          </div>

        </div>
      </section>

      {/* Featured Matches */}
      <section className="py-16 px-4 md:px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto space-y-8">

          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Featured Matches Today
            </h2>

            <p className="text-muted-foreground">
              AI-powered predictions generated from live match intelligence models
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matches.map((match) => (
              <MatchCard
                key={match.id}
                match={match}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="py-16 px-4 md:px-6"
      >
        <div className="max-w-6xl mx-auto space-y-12">

          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Why Choose ScoutBet?
            </h2>

            <p className="text-muted-foreground">
              Built for precision, transparency, and long-term betting performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {features.map((feature, idx) => {
              const Icon = feature.icon

              return (
                <Card
                  key={idx}
                  className="p-6 hover:border-primary transition-all hover:shadow-md"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon
                      size={22}
                      className="text-primary"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              )
            })}

          </div>

        </div>
      </section>

      {/* Leaderboard Preview */}
      <section className="py-16 px-4 md:px-6 bg-secondary/30">

        <div className="max-w-6xl mx-auto space-y-8">

          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Top Performing Analysts
            </h2>

            <p className="text-muted-foreground">
              Ranked by verified betting performance and accuracy metrics
            </p>
          </div>

          <Card className="p-6 md:p-8">

            <div className="space-y-4">

              {topLeaderboard.map((user, idx) => (

                <div
                  key={idx}
                  className="flex items-center justify-between p-4 border-b border-border last:border-0"
                >

                  <div className="flex items-center gap-4">

                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold shadow-sm">
                      #{idx + 1}
                    </div>

                    <div>
                      <div className="font-bold text-foreground">
                        {user.username}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {user.wins} wins • {user.losses} losses
                      </div>
                    </div>

                  </div>

                  <div className="text-right">
                    <div className="font-bold text-accent">
                      +${user.profit}
                    </div>

                    <div className="text-sm text-muted-foreground">
                      {user.accuracy}% accuracy
                    </div>
                  </div>

                </div>

              ))}

            </div>

            <Link href="/login">
              <Button
                variant="outline"
                className="w-full mt-4"
              >
                View Full Leaderboard
              </Button>
            </Link>

          </Card>

        </div>

      </section>

      {/* Pricing */}
      <section className="py-16 px-4 md:px-6">

        <div className="max-w-6xl mx-auto space-y-12">

          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Simple Pricing
            </h2>

            <p className="text-muted-foreground">
              Flexible plans designed for casual bettors and professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {Object.entries(branding.tiers).map(([key, tier]) => (

              <Card
                key={key}
                className={`p-6 space-y-6 transition-all hover:shadow-md ${
                  key === 'vip'
                    ? 'border-primary ring-2 ring-primary/50'
                    : ''
                }`}
              >

                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {tier.name}
                  </h3>

                  <div className="text-4xl font-bold text-primary">
                    ${tier.price}

                    <span className="text-lg text-muted-foreground font-normal">
                      /month
                    </span>

                  </div>
                </div>

                <ul className="space-y-3">

                  {tier.features.map((feature, idx) => (

                    <li
                      key={idx}
                      className="flex items-start gap-2 text-muted-foreground text-sm"
                    >

                      <CheckCircle
                        size={16}
                        className="text-primary mt-1"
                      />

                      <span>{feature}</span>

                    </li>

                  ))}

                </ul>

                <Link href="/login" className="block">

                  <Button
                    className="w-full"
                    variant={key === 'vip' ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>

                </Link>

              </Card>

            ))}

          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-r from-primary/20 to-accent/20 border-t border-b border-primary/30">

        <div className="max-w-4xl mx-auto text-center space-y-6">

          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Elevate Your Betting Strategy?
          </h2>

          <p className="text-lg text-muted-foreground">
            Join a growing network of analysts using{' '}
            {branding.platformName} for consistent betting performance.
          </p>

          <Link href="/login">
            <Button
              size="lg"
              className="text-base shadow-lg hover:shadow-primary/40"
            >
              Start Your Free Trial
            </Button>
          </Link>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 md:px-6">

        <div className="max-w-6xl mx-auto text-center text-muted-foreground text-sm">

          <p>
            © 2024 {branding.platformName}. All rights reserved.
            Betting involves risk. Use responsibly.
          </p>

        </div>

      </footer>

    </div>
  )
}