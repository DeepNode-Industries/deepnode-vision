'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  trend?: { value: number; label: string }
  icon: React.ElementType
  color?: 'cyan' | 'violet' | 'emerald' | 'amber'
  index?: number
}

const colorConfig = {
  cyan: { border: 'border-cyan-500/20', bg: 'bg-cyan-500/10', icon: 'text-cyan-400', value: 'text-cyan-400' },
  violet: { border: 'border-violet-500/20', bg: 'bg-violet-500/10', icon: 'text-violet-400', value: 'text-violet-400' },
  emerald: { border: 'border-emerald-500/20', bg: 'bg-emerald-500/10', icon: 'text-emerald-400', value: 'text-emerald-400' },
  amber: { border: 'border-amber-500/20', bg: 'bg-amber-500/10', icon: 'text-amber-400', value: 'text-amber-400' },
}

export function MetricCard({ title, value, subtitle, trend, icon: Icon, color = 'cyan', index = 0 }: MetricCardProps) {
  const colors = colorConfig[color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-2xl border ${colors.border} bg-dark-900/60 backdrop-blur-sm p-5`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{title}</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.08 + 0.2 }}
            className={cn('font-display text-3xl font-bold mt-1', colors.value)}
          >
            {value}
          </motion.p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`w-10 h-10 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center shrink-0`}>
          <Icon className={cn('w-5 h-5', colors.icon)} />
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/5">
          {trend.value >= 0 ? (
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-red-400" />
          )}
          <span className={cn('text-xs font-medium', trend.value >= 0 ? 'text-emerald-400' : 'text-red-400')}>
            {trend.value >= 0 ? '+' : ''}{trend.value}%
          </span>
          <span className="text-xs text-slate-600">{trend.label}</span>
        </div>
      )}
    </motion.div>
  )
}
