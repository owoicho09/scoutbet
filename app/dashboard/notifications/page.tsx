'use client'

import { generateNotifications } from '@/lib/data'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, TrendingUp, Trophy, AlertCircle, CheckCircle, Trash2 } from 'lucide-react'

export default function Notifications() {
  const notifications = generateNotifications()

  const getIcon = (type: string) => {
    switch (type) {
      case 'prediction':
        return <TrendingUp className="w-5 h-5" />
      case 'leaderboard':
        return <Trophy className="w-5 h-5" />
      case 'signal':
        return <AlertCircle className="w-5 h-5" />
      case 'result':
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'prediction':
        return 'bg-primary/20 text-primary'
      case 'leaderboard':
        return 'bg-accent/20 text-accent'
      case 'signal':
        return 'bg-warning/20 text-warning'
      case 'result':
        return 'bg-success/20 text-success'
      default:
        return 'bg-muted/20 text-muted-foreground'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated on predictions, signals, and leaderboard changes
          </p>
        </div>
        <Button variant="outline" size="sm">
          Mark All as Read
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        <Button variant="outline" size="sm">
          All
        </Button>
        <Button variant="secondary" size="sm">
          Unread
        </Button>
        <Button variant="secondary" size="sm">
          Predictions
        </Button>
        <Button variant="secondary" size="sm">
          Signals
        </Button>
        <Button variant="secondary" size="sm">
          Results
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => (
          <Card
            key={notification.id}
            className={`p-4 md:p-6 ${!notification.read ? 'bg-primary/5 border-primary/50' : ''}`}
          >
            <div className="flex items-start justify-between gap-4">
              {/* Content */}
              <div className="flex items-start gap-4 flex-1">
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(
                    notification.type
                  )}`}
                >
                  {getIcon(notification.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-foreground">{notification.title}</h3>
                    {!notification.read && (
                      <Badge className="bg-primary/20 text-primary text-xs">New</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {notification.message}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    {notification.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}{' '}
                    •{' '}
                    {Math.round(
                      (Date.now() - notification.timestamp.getTime()) / 60000
                    )}{' '}
                    minutes ago
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  View
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-foreground">Prediction alerts</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-foreground">Leaderboard updates</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-foreground">Signal notifications</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4" />
            <span className="text-foreground">Bet results</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-foreground">Email notifications</span>
          </label>
        </div>
        <Button className="mt-6">Save Settings</Button>
      </Card>
    </div>
  )
}
