'use client'

import { motion } from 'framer-motion'
import { Download, Trash2, Eye, Clock } from 'lucide-react'
import { cn, formatTimestamp, formatFileSize, formatDuration } from '@/lib/utils'
import { ConfidenceBadge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { exportAnalysisJSON } from '@/lib/storage'
import type { VisionAnalysisResult } from '@/lib/types'

interface ResultCardProps {
  result: VisionAnalysisResult
  onDelete?: (id: string) => void
  onView?: (result: VisionAnalysisResult) => void
  variant?: 'card' | 'row'
}

export function ResultCard({ result, onDelete, onView, variant = 'card' }: ResultCardProps) {
  if (variant === 'row') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 rounded-xl border border-white/8 bg-dark-800/40 px-4 py-3 hover:border-white/15 transition-all duration-200"
      >
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white font-medium truncate">{result.fileName}</p>
          <p className="text-xs text-slate-500 mt-0.5">{formatTimestamp(result.timestamp)}</p>
        </div>
        <div className="hidden sm:block shrink-0">
          <span className="text-xs text-slate-400 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
            {result.documentTypeLabel}
          </span>
        </div>
        <div className="shrink-0">
          <ConfidenceBadge confidence={result.confidence} />
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {onView && (
            <button
              onClick={() => onView(result)}
              className="rounded-lg p-1.5 text-slate-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => exportAnalysisJSON(result)}
            className="rounded-lg p-1.5 text-slate-500 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(result.id)}
              className="rounded-lg p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2 }}
      className="rounded-2xl border border-white/10 bg-dark-900/60 backdrop-blur-sm p-4 hover:border-white/20 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm text-white font-medium truncate">{result.fileName}</p>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatTimestamp(result.timestamp)}
          </p>
        </div>
        <ConfidenceBadge confidence={result.confidence} />
      </div>

      {/* Type */}
      <div className="mb-3">
        <span className="text-xs text-slate-500">{result.documentTypeLabel}</span>
      </div>

      {/* Key fields preview */}
      {Object.entries(result.fields).slice(0, 3).map(([key, value]) => (
        <div key={key} className={cn('flex justify-between text-xs py-1 border-b border-white/5 last:border-0')}>
          <span className="text-slate-500 capitalize">{key.replace(/_/g, ' ')}</span>
          <span className="text-white font-medium truncate max-w-[140px]">{value}</span>
        </div>
      ))}

      {/* Footer */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
        <span className="text-xs text-slate-600">
          {formatFileSize(result.fileSize)} · {formatDuration(result.processingTime)}
        </span>
        <div className="flex gap-1">
          {onView && (
            <Button size="sm" variant="ghost" onClick={() => onView(result)}>
              <Eye className="w-3 h-3" />
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={() => exportAnalysisJSON(result)}>
            <Download className="w-3 h-3" />
          </Button>
          {onDelete && (
            <Button size="sm" variant="danger" onClick={() => onDelete(result.id)}>
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  )
}
