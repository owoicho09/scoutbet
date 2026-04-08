'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
  ChevronDown,
  Menu,
  X,
  LayoutDashboard,
  Trophy,
  Target,
  TrendingUp,
  Award,
  Radio,
  Wallet,
  CreditCard,
} from 'lucide-react'

import { branding } from '@/lib/branding'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Matches', href: '/dashboard/matches', icon: Trophy },
  { label: 'Predictions', href: '/dashboard/odds-builder', icon: Target },
  { label: 'Live Bet', href: '/dashboard/signals', icon: Radio },
  { label: 'Pricing', href: '/dashboard/pricing', icon: CreditCard },
]

export function Sidebar({
  tier = 'vip',
}: {
  tier?: 'free' | 'vip' | 'pro'
}) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-40 md:hidden p-2 hover:bg-card rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border transition-all duration-300 z-30 ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 flex flex-col h-full">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 mb-8 hover:opacity-80"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md"
              style={{
                backgroundColor: branding.colors.primary,
              }}
            >
              {branding.logoText}
            </div>

            <div>
              <div className="font-bold text-white">
                {branding.platformName}
              </div>

              <div className="text-xs text-muted-foreground">
                {branding.tagline}
              </div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">

            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <Icon
                    size={20}
                    className={`${
                      active
                        ? 'text-white'
                        : 'text-muted-foreground'
                    }`}
                  />

                  <span className="font-medium">
                    {item.label}
                  </span>
                </Link>
              )
            })}

          </nav>

          {/* Tier Badge */}


          {/* Profile Section */}
          <div className="border-t border-border mt-4 pt-4">

            <Link
              href="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 hover:bg-secondary rounded-lg transition-colors"
            >

              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-sm">
                JB
              </div>

              <div className="flex-1 min-w-0">

                <div className="font-medium text-sm truncate">
                  John Bettor
                </div>

                <div className="text-xs text-muted-foreground truncate">
                  john@example.com
                </div>

              </div>

            </Link>

          </div>

        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}