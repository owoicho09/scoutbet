'use client'

import { branding } from '@/lib/branding'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check } from 'lucide-react'

export default function Pricing() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-foreground">Pricing Plans</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your betting needs. Upgrade or downgrade anytime.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(branding.tiers).map(([key, tier]) => (
          <Card
            key={key}
            className={`p-8 space-y-6 ${
              key === 'vip'
                ? 'ring-2 ring-primary border-primary relative md:scale-105'
                : ''
            }`}
          >
            {key === 'vip' && (
              <Badge className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                RECOMMENDED
              </Badge>
            )}

            {/* Title */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-primary">${tier.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </div>

            {/* Features */}
            <ul className="space-y-3">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            {key === 'vip' ? (
              <Button className="w-full" size="lg">
                Current Plan
              </Button>
            ) : (
              <Button
                variant={key === 'vip' ? 'default' : 'outline'}
                className="w-full"
                size="lg"
              >
                Upgrade to {tier.name}
              </Button>
            )}
          </Card>
        ))}
      </div>

      {/* FAQ */}
      <Card className="p-8 mt-12">
        <h3 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-foreground mb-2">Can I change plans anytime?</h4>
            <p className="text-muted-foreground text-sm">
              Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">What payment methods do you accept?</h4>
            <p className="text-muted-foreground text-sm">
              We accept all major credit cards, PayPal, and crypto payments for premium plans.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Is there a free trial?</h4>
            <p className="text-muted-foreground text-sm">
              Free plan includes basic features with limited predictions and signals per day.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Do you offer refunds?</h4>
            <p className="text-muted-foreground text-sm">
              30-day money-back guarantee for annual subscriptions. Monthly plans can be cancelled anytime.
            </p>
          </div>
        </div>
      </Card>

      {/* Comparison Table */}
      <Card className="p-8">
        <h3 className="text-2xl font-bold text-foreground mb-6">Detailed Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-bold text-foreground">Feature</th>
                <th className="text-center py-4 px-4 font-bold text-foreground">Free</th>
                <th className="text-center py-4 px-4 font-bold text-foreground">VIP</th>
                <th className="text-center py-4 px-4 font-bold text-foreground">Pro</th>
              </tr>
            </thead>
            <tbody>
              {[
                { feature: 'Daily Predictions', free: '5', vip: 'Unlimited', pro: 'Unlimited' },
                { feature: 'Match Analysis', free: 'Basic', vip: 'Advanced', pro: 'Elite' },
                { feature: 'Odds Builder', free: 'Limited', vip: 'Full', pro: 'Full' },
                { feature: 'Leaderboard', free: 'Yes', vip: 'Yes', pro: 'Yes' },
                { feature: 'Signal Feed', free: 'Limited', vip: 'Full', pro: 'Full' },
                { feature: 'Accumulator Tools', free: 'No', vip: 'Yes', pro: 'Yes' },
                { feature: 'API Access', free: 'No', vip: 'No', pro: 'Yes' },
                { feature: 'Discord Community', free: 'No', vip: 'Yes', pro: 'Yes' },
                { feature: 'Priority Support', free: 'No', vip: 'Yes', pro: '24/7' },
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-border">
                  <td className="py-4 px-4 text-foreground font-medium">{row.feature}</td>
                  <td className="py-4 px-4 text-center text-muted-foreground">{row.free}</td>
                  <td className="py-4 px-4 text-center text-primary font-bold">{row.vip}</td>
                  <td className="py-4 px-4 text-center text-accent font-bold">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
