'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Trash2, Download, SlidersHorizontal } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { ResultCard } from '@/components/vision/result-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import { ExtractionPanel } from '@/components/vision/extraction-panel'
import { ConfidenceMeter } from '@/components/vision/confidence-meter'
import { useVisionStore } from '@/store/vision-store'
import { MOCK_ANALYSES } from '@/lib/mock-data'
import { exportAnalysisJSON } from '@/lib/storage'
import type { VisionAnalysisResult } from '@/lib/types'

export default function DocumentsPage() {
  const { analyses, removeAnalysis } = useVisionStore()
  const [search, setSearch] = useState('')
  const [viewingResult, setViewingResult] = useState<VisionAnalysisResult | null>(null)

  const allAnalyses = useMemo(() => {
    const combined = [...analyses]
    return combined.length === 0 ? MOCK_ANALYSES : combined
  }, [analyses])

  const filtered = useMemo(() => {
    if (!search) return allAnalyses
    const q = search.toLowerCase()
    return allAnalyses.filter(
      a =>
        a.fileName.toLowerCase().includes(q) ||
        a.documentTypeLabel.toLowerCase().includes(q) ||
        Object.values(a.fields).some(v => v.toLowerCase().includes(q))
    )
  }, [allAnalyses, search])

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search documents..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-dark-800/60 pl-9 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/20 transition-all"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filter
            </Button>
            {analyses.length > 0 && (
              <Button variant="danger" size="sm" onClick={() => useVisionStore.getState().clearHistory()}>
                <Trash2 className="w-3.5 h-3.5" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex gap-4 text-xs text-slate-500">
          <span>{filtered.length} documents</span>
          <span>·</span>
          <span>
            Avg confidence:{' '}
            {filtered.length
              ? Math.round(filtered.reduce((s, a) => s + a.confidence, 0) / filtered.length)
              : 0}%
          </span>
        </div>

        {/* Documents list */}
        <Card>
          <CardHeader>
            <CardTitle>All Analyzed Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mb-3 text-2xl">
                  📂
                </div>
                <p className="text-slate-400 text-sm">
                  {search ? 'No documents match your search' : 'No documents yet'}
                </p>
                <p className="text-slate-600 text-xs mt-1">
                  {search ? 'Try a different search term' : 'Upload files in the Scanner to get started'}
                </p>
              </div>
            ) : (
              <motion.div className="space-y-2">
                {filtered.map((result, i) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <ResultCard
                      result={result}
                      onDelete={removeAnalysis}
                      onView={setViewingResult}
                      variant="row"
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Detail modal */}
        <Modal
          open={Boolean(viewingResult)}
          onClose={() => setViewingResult(null)}
          title={viewingResult?.fileName}
          size="lg"
        >
          {viewingResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <ConfidenceMeter confidence={viewingResult.confidence} size="sm" />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => exportAnalysisJSON(viewingResult)}
                >
                  <Download className="w-3.5 h-3.5" />
                  Export JSON
                </Button>
              </div>
              <ExtractionPanel result={viewingResult} />
            </div>
          )}
        </Modal>
      </div>
    </AppShell>
  )
}
