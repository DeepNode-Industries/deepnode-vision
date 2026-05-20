'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Bell, Menu, X, ChevronRight } from 'lucide-react'

const PAGE_META: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Dashboard', subtitle: 'Overview & activity' },
  '/scanner': { title: 'AI Scanner', subtitle: 'Analyze documents' },
  '/documents': { title: 'Documents', subtitle: 'History & results' },
  '/analytics': { title: 'Analytics', subtitle: 'Insights & trends' },
  '/templates': { title: 'Templates', subtitle: 'Pre-built extractors' },
  '/settings': { title: 'Settings', subtitle: 'Configure workspace' },
  '/about': { title: 'About', subtitle: 'DeepNode Industries' },
}

interface TopbarProps {
  onMenuClick?: () => void
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname()
  const page = PAGE_META[pathname] ?? { title: 'DeepNode Vision', subtitle: 'AI Document Intelligence' }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/10 bg-dark-950/85 backdrop-blur-xl px-4 lg:px-6">
      {/* Left: hamburger (mobile) + page title */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onMenuClick}
          className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </motion.button>

        {/* Page info */}
        <div>
          <h1 className="font-display font-semibold text-white text-sm leading-none">{page.title}</h1>
          <p className="text-[11px] text-slate-500 mt-0.5 hidden sm:block">{page.subtitle}</p>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Scanner CTA — mobile shortcut */}
        {pathname !== '/scanner' && (
          <Link href="/scanner" className="lg:hidden">
            <motion.div
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400"
            >
              Scan
              <ChevronRight className="w-3 h-3" />
            </motion.div>
          </Link>
        )}

        {/* Notification bell */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 transition-all"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-cyan-400" />
        </motion.button>
      </div>
    </header>
  )
}
