import { Sidebar } from '@/components/layout/sidebar'
import { TopBar } from '@/components/layout/top-bar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar tier="vip" />
      <TopBar />
      <main className="md:ml-64 mt-16 p-4 md:p-6">
        {children}
      </main>
    </div>
  )
}
