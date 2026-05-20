'use client'

import { motion } from 'framer-motion'
import { Check, Loader2, Clock, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TimelineStep } from '@/lib/types'

interface AnalysisTimelineProps {
  steps: TimelineStep[]
}

export function AnalysisTimeline({ steps }: AnalysisTimelineProps) {
  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={cn(
            'flex items-center gap-3 rounded-xl border px-3 py-2.5 transition-all duration-300',
            step.status === 'complete'
              ? 'border-emerald-500/20 bg-emerald-500/5'
              : step.status === 'running'
              ? 'border-cyan-500/30 bg-cyan-500/10'
              : step.status === 'error'
              ? 'border-red-500/20 bg-red-500/5'
              : 'border-white/5 bg-white/2'
          )}
        >
          {/* Icon */}
          <div
            className={cn(
              'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
              step.status === 'complete'
                ? 'bg-emerald-500/20'
                : step.status === 'running'
                ? 'bg-cyan-500/20'
                : step.status === 'error'
                ? 'bg-red-500/20'
                : 'bg-white/5'
            )}
          >
            {step.status === 'complete' && <Check className="w-3 h-3 text-emerald-400" />}
            {step.status === 'running' && (
              <Loader2 className="w-3 h-3 text-cyan-400 animate-spin" />
            )}
            {step.status === 'error' && <AlertCircle className="w-3 h-3 text-red-400" />}
            {step.status === 'pending' && <Clock className="w-3 h-3 text-slate-600" />}
          </div>

          {/* Label */}
          <span
            className={cn(
              'text-xs font-medium flex-1',
              step.status === 'complete'
                ? 'text-emerald-400'
                : step.status === 'running'
                ? 'text-cyan-400'
                : step.status === 'error'
                ? 'text-red-400'
                : 'text-slate-600'
            )}
          >
            {step.label}
          </span>

          {/* Duration */}
          {step.duration && (
            <span className="text-xs text-slate-600 font-mono">
              {step.duration}ms
            </span>
          )}

          {/* Running pulse */}
          {step.status === 'running' && (
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}
