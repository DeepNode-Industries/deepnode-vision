'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ConfidenceMeterProps {
  confidence: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

export function ConfidenceMeter({ confidence, size = 'md', showLabel = true }: ConfidenceMeterProps) {
  const color =
    confidence >= 90
      ? { bar: 'from-emerald-500 to-emerald-400', text: 'text-emerald-400', bg: 'bg-emerald-400', ring: 'ring-emerald-500/30' }
      : confidence >= 75
      ? { bar: 'from-cyan-500 to-cyan-400', text: 'text-cyan-400', bg: 'bg-cyan-400', ring: 'ring-cyan-500/30' }
      : confidence >= 60
      ? { bar: 'from-amber-500 to-amber-400', text: 'text-amber-400', bg: 'bg-amber-400', ring: 'ring-amber-500/30' }
      : { bar: 'from-red-500 to-red-400', text: 'text-red-400', bg: 'bg-red-400', ring: 'ring-red-500/30' }

  const label =
    confidence >= 90 ? 'High Confidence' : confidence >= 75 ? 'Good' : confidence >= 60 ? 'Moderate' : 'Low'

  const sizeMap = {
    sm: { circle: 56, stroke: 4, font: 'text-sm' },
    md: { circle: 80, stroke: 6, font: 'text-xl' },
    lg: { circle: 112, stroke: 8, font: 'text-2xl' },
  }

  const { circle, stroke, font } = sizeMap[size]
  const radius = (circle - stroke * 2) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (confidence / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: circle, height: circle }}>
        <svg width={circle} height={circle} className="-rotate-90">
          {/* Track */}
          <circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          {/* Progress */}
          <motion.circle
            cx={circle / 2}
            cy={circle / 2}
            r={radius}
            fill="none"
            stroke="url(#conf-grad)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="conf-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={confidence >= 90 ? '#10b981' : confidence >= 75 ? '#06b6d4' : confidence >= 60 ? '#f59e0b' : '#ef4444'} />
              <stop offset="100%" stopColor={confidence >= 90 ? '#34d399' : confidence >= 75 ? '#22d3ee' : confidence >= 60 ? '#fbbf24' : '#f87171'} />
            </linearGradient>
          </defs>
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={cn('font-display font-bold', color.text, font)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {confidence}
          </motion.span>
        </div>
      </div>

      {showLabel && (
        <div className="text-center">
          <p className={cn('text-xs font-medium', color.text)}>{label}</p>
          <p className="text-xs text-slate-500">Confidence Score</p>
        </div>
      )}
    </div>
  )
}

export function ConfidenceBar({ confidence }: { confidence: number }) {
  const color =
    confidence >= 90
      ? 'from-emerald-500 to-emerald-400'
      : confidence >= 75
      ? 'from-cyan-500 to-cyan-400'
      : confidence >= 60
      ? 'from-amber-500 to-amber-400'
      : 'from-red-500 to-red-400'

  return (
    <div className="w-full">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-slate-400">Confidence</span>
        <span className="text-white font-medium">{confidence}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
