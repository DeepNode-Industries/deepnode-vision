'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, AlertTriangle, Lightbulb, Code2, FileText, ListChecks } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ConfidenceBar } from './confidence-meter'
import { DocumentClassifier } from './document-classifier'
import type { VisionAnalysisResult } from '@/lib/types'

interface ExtractionPanelProps {
  result: VisionAnalysisResult
}

type Tab = 'fields' | 'ocr' | 'json' | 'summary'

export function ExtractionPanel({ result }: ExtractionPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('fields')
  const [copied, setCopied] = useState(false)

  const copyJSON = async () => {
    await navigator.clipboard.writeText(result.rawJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const TABS: { id: Tab; label: string; icon: typeof FileText }[] = [
    { id: 'fields', label: 'Fields', icon: ListChecks },
    { id: 'summary', label: 'Summary', icon: Lightbulb },
    { id: 'ocr', label: 'OCR Text', icon: FileText },
    { id: 'json', label: 'JSON', icon: Code2 },
  ]

  return (
    <div className="flex flex-col gap-4">
      {/* Document type + confidence */}
      <div className="flex items-center justify-between">
        <DocumentClassifier
          documentType={result.documentType}
          confidence={result.confidence}
          tags={result.tags}
        />
      </div>

      <ConfidenceBar confidence={result.confidence} />

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl border border-white/10 bg-dark-800/50 p-1">
        {TABS.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-500 hover:text-slate-300'
              )}
            >
              <Icon className="w-3 h-3" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        {activeTab === 'fields' && (
          <motion.div
            key="fields"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-2"
          >
            {Object.entries(result.fields).map(([key, value]) => {
              const field = result.extractedFields.find(f => f.key === key)
              return (
                <div
                  key={key}
                  className="flex items-start justify-between gap-3 rounded-xl border border-white/8 bg-dark-800/40 px-3 py-2.5"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-slate-500 font-mono capitalize">
                      {key.replace(/_/g, ' ')}
                    </span>
                    <p className="text-sm text-white font-medium truncate mt-0.5">{value}</p>
                  </div>
                  {field && (
                    <span className="text-xs text-slate-600 shrink-0 font-mono">{field.confidence}%</span>
                  )}
                </div>
              )
            })}
          </motion.div>
        )}

        {activeTab === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-4"
          >
            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
              <p className="text-sm text-slate-300 leading-relaxed">{result.summary}</p>
            </div>

            {result.warnings.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Warnings ({result.warnings.length})
                </p>
                {result.warnings.map((w, i) => (
                  <div key={i} className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-3 py-2">
                    <p className="text-xs text-amber-300">{w.message}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs font-medium text-violet-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5" />
                Suggested Actions
              </p>
              {result.suggestedActions.map((action, i) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                  <p className="text-xs text-slate-300">{action}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'ocr' && (
          <motion.div
            key="ocr"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="rounded-xl border border-white/10 bg-dark-800/60 p-4 max-h-64 overflow-y-auto">
              <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
                {result.extractedText}
              </pre>
            </div>
          </motion.div>
        )}

        {activeTab === 'json' && (
          <motion.div
            key="json"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="relative"
          >
            <button
              onClick={copyJSON}
              className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-lg border border-white/10 bg-dark-800 px-2 py-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <div className="rounded-xl border border-white/10 bg-dark-800/60 p-4 max-h-64 overflow-y-auto">
              <pre className="text-xs text-emerald-400/80 font-mono whitespace-pre-wrap leading-relaxed pr-16">
                {result.rawJson}
              </pre>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
