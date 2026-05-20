'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ResultCard } from '@/components/vision/result-card'
import type { VisionAnalysisResult } from '@/lib/types'

interface RecentAnalysesProps {
  analyses: VisionAnalysisResult[]
  onDelete?: (id: string) => void
}

export function RecentAnalyses({ analyses, onDelete }: RecentAnalysesProps) {
  if (analyses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-3">
          <span className="text-2xl">📄</span>
        </div>
        <p className="text-slate-400 text-sm">No analyses yet</p>
        <p className="text-slate-600 text-xs mt-1">Upload a document in the Scanner to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {analyses.slice(0, 5).map((analysis) => (
        <ResultCard
          key={analysis.id}
          result={analysis}
          onDelete={onDelete}
          variant="row"
        />
      ))}
      {analyses.length > 5 && (
        <Link href="/documents" className="flex items-center justify-center gap-2 py-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
          View all {analyses.length} documents
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  )
}
