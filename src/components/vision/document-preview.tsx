'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { ScanAnimation } from './scan-animation'
import type { AnalysisStatus } from '@/lib/types'

interface DocumentPreviewProps {
  previewUrl: string | null
  fileName: string
  fileType: string
  status: AnalysisStatus
}

export function DocumentPreview({ previewUrl, fileName, fileType, status }: DocumentPreviewProps) {
  const isScanning = status === 'scanning' || status === 'extracting' || status === 'classifying'
  const isPdf = fileType === 'application/pdf'

  return (
    <div className="relative rounded-2xl border border-white/10 bg-dark-800/50 overflow-hidden min-h-[300px] flex items-center justify-center">
      {previewUrl && !isPdf ? (
        <div className="relative w-full h-full">
          <Image
            src={previewUrl}
            alt={fileName}
            fill
            className="object-contain p-4"
            unoptimized
          />
          <ScanAnimation active={isScanning} />
        </div>
      ) : isPdf ? (
        <div className="relative flex flex-col items-center justify-center gap-4 p-8 w-full h-full">
          <div className="w-20 h-24 rounded-lg border border-red-500/30 bg-red-500/10 flex flex-col items-center justify-center gap-1">
            <FileText className="w-8 h-8 text-red-400" />
            <span className="text-xs text-red-400 font-mono font-bold">PDF</span>
          </div>
          <div className="text-center">
            <p className="text-white text-sm font-medium truncate max-w-[200px]">{fileName}</p>
            <p className="text-slate-500 text-xs mt-1">PDF document ready for analysis</p>
          </div>
          <ScanAnimation active={isScanning} />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 text-center p-8">
          <div className="w-16 h-16 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center">
            <FileText className="w-7 h-7 text-slate-500" />
          </div>
          <p className="text-slate-500 text-sm">No preview available</p>
        </div>
      )}

      {/* Status overlay for non-scanning states */}
      {status === 'complete' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-3 right-3"
        >
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-xs text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Analyzed
          </span>
        </motion.div>
      )}
    </div>
  )
}
