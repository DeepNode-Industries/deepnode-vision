'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  ScanLine,
  Files,
  BarChart3,
  Layers,
  Settings,
  Home,
  Zap,
  Info,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/scanner', label: 'AI Scanner', icon: ScanLine, highlight: true },
  { href: '/documents', label: 'Documents', icon: Files },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/templates', label: 'Templates', icon: Layers },
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/about', label: 'About', icon: Info },
]

interface SidebarProps {
  open?: boolean
  onClose?: () => void
}

export function Sidebar({ open = false, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop: always visible. Mobile: slide in/out */}
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : undefined }}
        className={cn(
          'fixed left-0 top-0 h-full w-64 flex flex-col border-r border-white/10 bg-dark-950/95 backdrop-blur-xl z-40 transition-transform duration-300 ease-out',
          /* Mobile: start offscreen, slide in when open */
          '-translate-x-full lg:translate-x-0',
          open && 'translate-x-0'
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <Link href="/" onClick={onClose} className="flex items-center gap-3">
            <DeepNodeLogoMark />
            <div>
              <span className="font-display font-bold text-white text-sm leading-none">DeepNode</span>
              <span className="block text-[10px] text-cyan-400 font-medium tracking-widest uppercase leading-none mt-0.5">
                Vision
              </span>
            </div>
          </Link>
          {/* Close button — mobile only */}
          <button
            onClick={onClose}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon, highlight }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href + '/'))
            return (
              <Link key={href} href={href} onClick={onClose}>
                <motion.div
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.97 }}
                  className={cn(
                    'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group',
                    active
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : highlight
                      ? 'text-slate-300 hover:bg-white/5 hover:text-white border border-transparent hover:border-violet-500/20'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent'
                  )}
                >
                  {/* Active indicator line */}
                  <AnimatePresence>
                    {active && (
                      <motion.div
                        layoutId="sidebar-active-bar"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-cyan-400 rounded-full"
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                      />
                    )}
                  </AnimatePresence>
                  <Icon className={cn(
                    'w-4 h-4 shrink-0',
                    active ? 'text-cyan-400' : highlight ? 'text-violet-400' : 'group-hover:text-cyan-400/60'
                  )} />
                  {label}
                  {highlight && !active && (
                    <span className="ml-auto">
                      <Zap className="w-3 h-3 text-violet-400" />
                    </span>
                  )}
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* Footer section */}
        <div className="px-3 py-4 border-t border-white/10 space-y-3">
          <Link href="/" onClick={onClose}>
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all duration-200">
              <Home className="w-4 h-4" />
              Back to Home
            </div>
          </Link>

          {/* Demo mode badge */}
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Demo Mode Active</span>
            </div>
            <p className="text-xs text-slate-500">Simulated AI · No real API calls</p>
          </div>

          {/* Logo watermark */}
          <div className="flex items-center justify-center gap-2 opacity-40 pt-1">
            <Image src="/logo.svg" alt="DeepNode Industries" width={16} height={16} className="h-4 w-auto" />
            <span className="text-[10px] text-slate-500">© 2026</span>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

function DeepNodeLogoMark() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lm-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#lm-grad)" opacity="0.12" />
      <circle cx="16" cy="16" r="5" stroke="url(#lm-grad)" strokeWidth="1.5" fill="none" />
      <circle cx="16" cy="16" r="2" fill="url(#lm-grad)" />
      <line x1="16" y1="4" x2="16" y2="10" stroke="url(#lm-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="22" x2="16" y2="28" stroke="url(#lm-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="16" x2="10" y2="16" stroke="url(#lm-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="16" x2="28" y2="16" stroke="url(#lm-grad)" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="4" r="1.5" fill="#06b6d4" />
      <circle cx="16" cy="28" r="1.5" fill="#8b5cf6" />
      <circle cx="4" cy="16" r="1.5" fill="#06b6d4" opacity="0.7" />
      <circle cx="28" cy="16" r="1.5" fill="#8b5cf6" opacity="0.7" />
    </svg>
  )
}
