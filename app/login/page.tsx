'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { branding } from '@/lib/branding'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store user session in localStorage (mock auth)
    localStorage.setItem('user', JSON.stringify({ email, tier: 'vip' }))
    if (rememberMe) {
      localStorage.setItem('rememberMe', email)
    }

    // Redirect to dashboard
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="mb-8 text-center">
        <Link href="/" className="flex items-center justify-center gap-2 mb-4">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: branding.colors.primary }}
          >
            {branding.logoText}
          </div>
        </Link>
        <h1 className="text-3xl font-bold text-foreground">{branding.platformName}</h1>
        <p className="text-muted-foreground mt-2">{branding.tagline}</p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
          <p className="text-muted-foreground">Sign in to your account to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-secondary border-border text-foreground placeholder-muted-foreground"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-secondary border-border text-foreground placeholder-muted-foreground"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="rememberMe"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="border-border"
            />
            <Label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
              Remember me
            </Label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full text-base"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Demo Note */}
        <div className="bg-secondary/50 border border-border rounded-lg p-3 text-sm text-muted-foreground">
          <p>
            Demo credentials: Use any email/password to access the dashboard. This is a prototype demo environment.
          </p>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Don&apos;t have an account?{' '}
            <button
              onClick={() => {
                setEmail('demo@example.com')
                setPassword('demo123')
              }}
              className="text-primary hover:underline font-medium"
            >
              Use demo account
            </button>
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex justify-center gap-4 text-xs text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors">
            Forgot Password?
          </a>
          <span>•</span>
          <a href="#" className="hover:text-primary transition-colors">
            Help
          </a>
        </div>
      </Card>

      {/* Back to Home */}
      <div className="mt-8">
        <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
