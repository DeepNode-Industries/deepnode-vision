'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, ScanLine, Files, BarChart3, Settings
} from 'lucide-react'
import Image from 'next/image'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { cn } from '@/lib/utils'

const BOTTOM_NAV = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '/documents', icon: Files, label: 'Docs' },
  { href: '/scanner', icon: ScanLine, label: 'Scan', highlight: true },
  { href: '/analytics', icon: BarChart3, label: 'Stats' },
  { href: '/settings', icon: Settings, label: 'Config' },
]

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content area */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Topbar onMenuClick={() => setSidebarOpen(p => !p)} />

        {/* Page content — extra bottom padding on mobile for bottom nav */}
        <main className="flex-1 p-4 lg:p-6 pb-28 lg:pb-6">
          {children}
        </main>

        {/* Desktop footer */}
        <footer className="hidden lg:flex items-center justify-center gap-3 border-t border-white/8 py-3 px-6">
          <Image src="/logo.svg" alt="DeepNode Industries" width={20} height={20} className="h-5 w-auto opacity-60" />
          <p className="text-xs text-slate-600">
            DeepNode Industries © 2026. Todos los derechos reservados.
          </p>
        </footer>
      </div>

      {/* Mobile bottom navigation bar */}
      <nav className="fixed bottom-0 left-0 right-0 lg:hidden z-40">
        {/* Glass bar */}
        <div className="border-t border-white/10 bg-dark-950/95 backdrop-blur-xl">
          <div className="flex items-center justify-around px-1 py-1">
            {BOTTOM_NAV.map(({ href, icon: Icon, label, highlight }) => {
              const active = pathname === href || pathname.startsWith(href + '/')
              return (
                <Link key={href} href={href} className="flex-1">
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="flex flex-col items-center gap-0.5 py-2"
                  >
                    {highlight ? (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200',
                          active
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-neon-cyan'
                            : 'bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/40'
                        )}
                      >
                        <Icon className="w-6 h-6 text-cyan-300" />
                      </motion.div>
                    ) : (
                      <div className={cn(
                        'w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200',
                        active
                          ? 'bg-cyan-500/15 border border-cyan-500/30'
                          : 'border border-transparent'
                      )}>
                        <Icon className={cn('w-5 h-5 transition-colors', active ? 'text-cyan-400' : 'text-slate-500')} />
                      </div>
                    )}
                    <span className={cn(
                      'text-[9px] font-medium tracking-wide transition-colors',
                      active ? 'text-cyan-400' : 'text-slate-600',
                      highlight && 'mt-0.5'
                    )}>
                      {label}
                    </span>
                  </motion.div>
                </Link>
              )
            })}
          </div>
          {/* Footer credit in bottom nav */}
          <div className="pb-2 text-center">
            <p className="text-[9px] text-slate-700 tracking-wide">DeepNode Industries © 2026</p>
          </div>
        </div>
      </nav>
    </div>
  )
}
