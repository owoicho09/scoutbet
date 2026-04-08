'use client'

import { currentUser } from '@/lib/data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { branding } from '@/lib/branding'

export default function Profile() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Profile Info */}
      <Card className="p-6 md:p-8">
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold">
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">{currentUser.name}</h2>
            <p className="text-muted-foreground mb-3">{currentUser.email}</p>
            <Badge className="bg-primary/20 text-primary">{currentUser.tier.toUpperCase()}</Badge>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-4 border-t border-border pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-foreground mb-2 block">Full Name</Label>
              <Input
                value={currentUser.name}
                readOnly
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <Label className="text-foreground mb-2 block">Email</Label>
              <Input
                value={currentUser.email}
                readOnly
                className="bg-secondary border-border"
              />
            </div>
          </div>
          <div>
            <Label className="text-foreground mb-2 block">Member Since</Label>
            <Input
              value={currentUser.joinDate.toLocaleDateString()}
              readOnly
              className="bg-secondary border-border"
            />
          </div>
          <Button>Edit Profile</Button>
        </div>
      </Card>

      {/* Subscription */}
      <Card className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-foreground mb-4">Subscription</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
            <div>
              <div className="font-bold text-foreground">{branding.tiers.vip.name} Plan</div>
              <div className="text-sm text-muted-foreground">
                ${branding.tiers.vip.price}/month
              </div>
            </div>
            <Badge className="bg-success/20 text-success">Active</Badge>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-foreground">Plan Features:</div>
            <ul className="space-y-1">
              {branding.tiers.vip.features.map((feature, idx) => (
                <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="text-accent">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
          <Button variant="outline" className="w-full">
            Manage Subscription
          </Button>
        </div>
      </Card>

      {/* Stats */}


      {/* Security */}
      <Card className="p-6 md:p-8">
        <h3 className="text-xl font-bold text-foreground mb-4">Security</h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full">
            Change Password
          </Button>
          <Button variant="outline" className="w-full">
            Two-Factor Authentication
          </Button>
          <Button variant="outline" className="w-full">
            Active Sessions
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 md:p-8 border-destructive/50">
        <h3 className="text-xl font-bold text-destructive mb-4">Danger Zone</h3>
        <div className="space-y-4">
          <Button variant="outline" className="w-full text-destructive">
            Delete Account
          </Button>
          <p className="text-xs text-muted-foreground">
            This action cannot be undone. All your data will be permanently deleted.
          </p>
        </div>
      </Card>
    </div>
  )
}
