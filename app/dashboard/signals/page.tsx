'use client'

import { useState } from 'react'
import { generateSignals } from '@/lib/data'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import {
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Users,
} from 'lucide-react'

interface Comment {
  id: number
  text: string
}

export default function Signals() {

  const signals = generateSignals()

  const [likes, setLikes] =
    useState<Record<string, number>>({})

  const [liked, setLiked] =
    useState<Record<string, boolean>>({})

  const [shares, setShares] =
    useState<Record<string, number>>({})

  const [commentsOpen, setCommentsOpen] =
    useState<Record<string, boolean>>({})

  const [comments, setComments] =
    useState<Record<string, Comment[]>>({})

  const [commentInputs, setCommentInputs] =
    useState<Record<string, string>>({})

  // Simulated online members

  const onlineUsers =
    Math.floor(Math.random() * 80) + 50

  const getConfidenceColor = (
    confidence: number
  ) => {

    if (confidence >= 85)
      return 'bg-success/20 text-success'

    if (confidence >= 75)
      return 'bg-primary/20 text-primary'

    return 'bg-warning/20 text-warning'

  }

  const toggleLike = (id: string) => {

    setLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))

    setLikes((prev) => ({
      ...prev,
      [id]:
        (prev[id] || 324) +
        (liked[id] ? -1 : 1),
    }))

  }

  const toggleShare = (id: string) => {

    setShares((prev) => ({
      ...prev,
      [id]: (prev[id] || 45) + 1,
    }))

  }

  const toggleComments = (
    id: string
  ) => {

    setCommentsOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))

  }

  const addComment = (
    id: string
  ) => {

    const text =
      commentInputs[id]

    if (!text) return

    const newComment = {
      id: Date.now(),
      text,
    }

    setComments((prev) => ({
      ...prev,
      [id]: [
        ...(prev[id] || []),
        newComment,
      ],
    }))

    setCommentInputs((prev) => ({
      ...prev,
      [id]: '',
    }))

  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-foreground mb-2">
          VIP Live Bet
        </h1>

        <p className="text-muted-foreground">
          Real-time predictions from your analyst.
          Engage, react, and track winning signals.
        </p>

      </div>

      {/* Online Users */}

      <Card className="p-4 flex items-center justify-between">

        <div className="flex items-center gap-2 text-sm">

          <Users size={18} className="text-success" />

          <span className="font-medium text-success">
            {onlineUsers} Members Online
          </span>

        </div>

        <Badge className="bg-success/20 text-success">
          Live Bet
        </Badge>

      </Card>

      {/* Filter Bar */}

      <Card className="p-4 flex gap-2 overflow-x-auto">

        <Button variant="outline">
          All Signals
        </Button>

        <Button variant="secondary">
          80%+ Confidence
        </Button>

        <Button variant="secondary">
          Today's Picks
        </Button>

      </Card>

      {/* Signals Feed */}

      <div className="space-y-4">

        {signals.map(
          (signal, idx) => {

            const signalComments =
              comments[signal.id] || []

            return (

              <Card
                key={signal.id}
                className="p-6 hover:bg-secondary/50 transition-colors animate-in fade-in"
                style={{
                  animationDelay:
                    `${idx * 100}ms`,
                }}
              >

                {/* Analyst Header */}

                <div className="flex items-start justify-between mb-4">

                  <div className="flex items-center gap-3 flex-1">

                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">

                      <span className="font-bold text-primary text-sm">
                        TB
                      </span>

                    </div>

                    <div className="flex-1">

                      <div className="flex items-center gap-2 mb-1">

                        <div className="font-bold text-foreground">
                          Elite Tipster
                        </div>

                        <Badge
                          variant="secondary"
                          className="text-xs"
                        >
                          Verified Analyst
                        </Badge>

                      </div>

                      <div className="text-xs text-muted-foreground">

                        {signal.timestamp.toLocaleTimeString(
                          [],
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}

                        {' • '}

                        {Math.round(
                          (Date.now() -
                            signal.timestamp.getTime()) /
                            60000
                        )}

                        {' minutes ago'}

                      </div>

                    </div>

                  </div>

                  <Badge
                    className={
                      getConfidenceColor(
                        signal.confidence
                      )
                    }
                  >

                    {signal.confidence}% Confidence

                  </Badge>

                </div>

                {/* Signal Content */}

                <div className="ml-13 space-y-3 mb-4">

                  <div>

                    <div className="text-sm text-muted-foreground mb-1">
                      Match
                    </div>

                    <div className="font-bold text-foreground">
                      {signal.match}
                    </div>

                  </div>

                  <div className="bg-secondary/50 p-3 rounded-lg border border-border">

                    <div className="flex items-center gap-2">

                      <TrendingUp
                        size={20}
                        className="text-accent"
                      />

                      <div className="font-bold text-lg text-foreground">
                        {signal.pick}
                      </div>

                    </div>

                  </div>

                </div>

                {/* Actions */}

                <div className="flex flex-col gap-3">

                  <div className="flex items-center justify-between text-muted-foreground">

                    <div className="flex gap-4 text-xs">

                      {/* Like */}

                      <button
                        onClick={() =>
                          toggleLike(
                            signal.id
                          )
                        }
                        className={`flex items-center gap-1 transition-colors ${
                          liked[signal.id]
                            ? 'text-red-500'
                            : 'hover:text-primary'
                        }`}
                      >

                        <Heart size={16} />

                        <span>
                          {likes[signal.id] || 324}
                        </span>

                      </button>

                      {/* Comments */}

                      <button
                        onClick={() =>
                          toggleComments(
                            signal.id
                          )
                        }
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >

                        <MessageCircle size={16} />

                        <span>
                          {signalComments.length || 12}
                        </span>

                      </button>

                      {/* Share */}

                      <button
                        onClick={() =>
                          toggleShare(
                            signal.id
                          )
                        }
                        className="flex items-center gap-1 hover:text-primary transition-colors"
                      >

                        <Share2 size={16} />

                        <span>
                          {shares[signal.id] || 45}
                        </span>

                      </button>

                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                    >
                      View Details
                    </Button>

                  </div>

                  {/* Comments Section */}

                  {commentsOpen[
                    signal.id
                  ] && (

                    <div className="space-y-3 pt-2 border-t border-border">

                      {/* Existing */}

                      {signalComments.map(
                        (c) => (

                          <div
                            key={c.id}
                            className="text-sm bg-secondary p-2 rounded-lg"
                          >

                            {c.text}

                          </div>

                        )
                      )}

                      {/* Input */}

                      <div className="flex gap-2">

                        <Input
                          placeholder="Write a comment..."
                          value={
                            commentInputs[
                              signal.id
                            ] || ''
                          }
                          onChange={(e) =>
                            setCommentInputs(
                              (prev) => ({
                                ...prev,
                                [signal.id]:
                                  e.target.value,
                              })
                            )
                          }
                        />

                        <Button
                          size="sm"
                          onClick={() =>
                            addComment(
                              signal.id
                            )
                          }
                        >

                          Send

                        </Button>

                      </div>

                    </div>

                  )}

                </div>

              </Card>

            )

          }
        )}

      </div>

      {/* Load More */}

      <div className="text-center pt-4">

        <Button
          variant="outline"
          size="lg"
          className="w-full md:w-auto"
        >

          Load More Signals

        </Button>

      </div>

    </div>

  )

}