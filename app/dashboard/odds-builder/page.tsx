'use client'

import { useState } from 'react'
import { generateMatches } from '@/lib/data'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

import {
  X,
  ChevronDown,
} from 'lucide-react'

interface SelectedPrediction {
  matchId: string
  homeTeam: string
  awayTeam: string
  prediction: string
  odds: number
  confidence: number
}

const bookmakers = [
  'SportyBet',
  '1xBet',
  '22Bet',
  'Bet9ja',
  'BetKing',
]

export default function OddsBuilder() {

  const allMatches = generateMatches()

  const [selectedPredictions, setSelectedPredictions] =
    useState<SelectedPrediction[]>([])

  const [stake, setStake] =
    useState('100')

  const [selectedBookie, setSelectedBookie] =
    useState('SportyBet')

  const [generatedCode, setGeneratedCode] =
    useState<string | null>(null)

  const addPrediction = (matchId: string) => {

    const match =
      allMatches.find(
        (m) => m.id === matchId
      )

    if (!match) return

    const existing =
      selectedPredictions.find(
        (p) => p.matchId === matchId
      )

    if (existing) {
      setSelectedPredictions(
        selectedPredictions.filter(
          (p) => p.matchId !== matchId
        )
      )
      return
    }

    const prediction =
      match.homeWinProb >
      match.awayWinProb
        ? match.homeTeam.name
        : match.awayTeam.name

    const odds =
      match.homeWinProb >
      match.awayWinProb
        ? match.odds.home
        : match.odds.away

    setSelectedPredictions([
      ...selectedPredictions,
      {
        matchId,
        homeTeam:
          match.homeTeam.name,
        awayTeam:
          match.awayTeam.name,
        prediction,
        odds,
        confidence:
          match.confidence,
      },
    ])

  }

  const removePrediction = (
    matchId: string
  ) => {

    setSelectedPredictions(
      selectedPredictions.filter(
        (p) => p.matchId !== matchId
      )
    )

  }

  const combinedOdds =
    selectedPredictions.length > 0
      ? selectedPredictions
          .reduce(
            (acc, p) =>
              acc * p.odds,
            1
          )
          .toFixed(2)
      : '0.00'

  const totalStake =
    parseFloat(stake) || 0

  const potentialProfit = (
    totalStake *
      parseFloat(combinedOdds) -
    totalStake
  ).toFixed(2)

  const avgConfidence =
    selectedPredictions.length > 0
      ? selectedPredictions.reduce(
          (acc, p) =>
            acc + p.confidence,
          0
        ) /
        selectedPredictions.length
      : 0

  const riskLevel =
    avgConfidence >= 75
      ? 'low'
      : avgConfidence >= 60
      ? 'medium'
      : 'high'

  const riskColor =
    riskLevel === 'high'
      ? 'text-destructive'
      : riskLevel === 'medium'
      ? 'text-warning'
      : 'text-success'

  const generateCode = () => {

    const code =
      'SCB-' +
      Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()

    setGeneratedCode(code)

  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-foreground mb-2">
          Prediction Builder
        </h1>

        <p className="text-muted-foreground">
          Build your accumulator
          using AI-powered
          match predictions.
        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Match Predictions */}

        <div className="lg:col-span-2 space-y-4">

          <h2 className="text-xl font-bold text-foreground">
            Available Predictions
          </h2>

          <div className="grid gap-4">

            {allMatches.map(
              (match) => {

                const prediction =
                  match.homeWinProb >
                  match.awayWinProb
                    ? match.homeTeam.name
                    : match.awayTeam.name

                const odds =
                  match.homeWinProb >
                  match.awayWinProb
                    ? match.odds.home
                    : match.odds.away

                return (

                  <Card
                    key={match.id}
                    className="p-4 cursor-pointer hover:bg-secondary transition-colors"
                    onClick={() =>
                      addPrediction(
                        match.id
                      )
                    }
                  >

                    <div className="flex items-center justify-between mb-3">

                      <div>

                        <div className="font-bold text-foreground">
                          {match.homeTeam.name} vs {match.awayTeam.name}
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {match.league}
                        </div>

                      </div>

                      <Badge variant="secondary">
                        {match.confidence}%
                      </Badge>

                    </div>

                    <div className="space-y-2">

                      <div className="flex justify-between text-sm">

                        <span>
                          Prediction:
                        </span>

                        <span className="font-bold text-primary">
                          {prediction}
                        </span>

                      </div>

                      <div className="flex justify-between text-sm">

                        <span>
                          Odds:
                        </span>

                        <span className="font-bold">
                          {odds.toFixed(2)}
                        </span>

                      </div>

                      <Progress
                        value={
                          match.confidence
                        }
                        className="h-2"
                      />

                    </div>

                  </Card>

                )

              }
            )}

          </div>

        </div>

        {/* Prediction Summary */}

        <div className="space-y-4">

          <Card className="p-6 sticky top-24">

            <h3 className="text-lg font-bold text-foreground mb-4">
              Prediction Slip
            </h3>

            {/* Selected */}

            <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">

              {selectedPredictions.length > 0 ? (

                selectedPredictions.map(
                  (bet) => (

                    <div
                      key={bet.matchId}
                      className="flex items-start justify-between p-3 bg-secondary rounded-lg"
                    >

                      <div>

                        <div className="text-sm font-bold">
                          {bet.homeTeam} vs {bet.awayTeam}
                        </div>

                        <div className="text-xs text-muted-foreground">

                          {bet.prediction}
                          {' '}@{' '}
                          {bet.odds.toFixed(2)}

                        </div>

                      </div>

                      <button
                        onClick={() =>
                          removePrediction(
                            bet.matchId
                          )
                        }
                        className="ml-2 p-1 hover:bg-border rounded"
                      >

                        <X size={16} />

                      </button>

                    </div>

                  )
                )

              ) : (

                <p className="text-sm text-muted-foreground text-center py-4">
                  Select predictions to build your slip
                </p>

              )}

            </div>

            {/* Bookmaker */}

            <div className="space-y-2 mb-4">

              <label className="text-xs font-medium">
                Select Bookmaker
              </label>

              <select
                className="w-full p-2 rounded-md bg-secondary border border-border"
                value={selectedBookie}
                onChange={(e) =>
                  setSelectedBookie(
                    e.target.value
                  )
                }
              >

                {bookmakers.map(
                  (b) => (

                    <option key={b}>
                      {b}
                    </option>

                  )
                )}

              </select>

            </div>

            {/* Stats */}

            <div className="border-t border-border pt-4 space-y-4">

              <div>

                <div className="text-xs text-muted-foreground">
                  Combined Odds
                </div>

                <div className="text-3xl font-bold text-primary">
                  {combinedOdds}
                </div>

              </div>

              <div>

                <label className="text-xs font-medium mb-1 block">
                  Stake ($)
                </label>

                <Input
                  type="number"
                  value={stake}
                  onChange={(e) =>
                    setStake(
                      e.target.value
                    )
                  }
                />

              </div>

              <div>

                <div className="text-xs text-muted-foreground">
                  Potential Profit
                </div>

                <div className="text-2xl font-bold text-accent">
                  ${potentialProfit}
                </div>

              </div>

              {/* Risk */}

              <div>

                <div className="flex justify-between text-xs mb-2">

                  <span>
                    Risk Level
                  </span>

                  <span
                    className={`font-bold ${riskColor}`}
                  >
                    {riskLevel}
                  </span>

                </div>

                <Progress
                  value={
                    riskLevel === 'low'
                      ? 33
                      : riskLevel === 'medium'
                      ? 66
                      : 100
                  }
                  className="h-2"
                />

              </div>

              {/* Generate */}

              <Button
                disabled={
                  selectedPredictions.length === 0
                }
                onClick={generateCode}
                className="w-full"
              >

                Generate Bet Slip Code

              </Button>

              {generatedCode && (

                <div className="text-center p-3 bg-secondary rounded-lg">

                  <div className="text-xs text-muted-foreground">
                    Slip Code
                  </div>

                  <div className="font-bold text-lg text-primary">
                    {generatedCode}
                  </div>

                  <div className="text-xs text-muted-foreground mt-1">
                    Use this code on {selectedBookie}
                  </div>

                </div>

              )}

            </div>

          </Card>

        </div>

      </div>

    </div>

  )

}