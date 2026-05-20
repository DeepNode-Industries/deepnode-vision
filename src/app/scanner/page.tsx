'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ScanLine, Download, Save, RefreshCw, Brain, Camera, Upload, ChevronDown, ChevronUp } from 'lucide-react'
import { AppShell } from '@/components/layout/app-shell'
import { UploadZone } from '@/components/vision/upload-zone'
import { DocumentPreview } from '@/components/vision/document-preview'
import { ExtractionPanel } from '@/components/vision/extraction-panel'
import { AnalysisTimeline } from '@/components/vision/analysis-timeline'
import { ConfidenceMeter } from '@/components/vision/confidence-meter'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useVisionStore, INITIAL_TIMELINE } from '@/store/vision-store'
import { analyzeDocument } from '@/lib/vision-engine'
import { exportAnalysisJSON } from '@/lib/storage'

const STEP_SEQUENCE = [
  { stepId: 'upload', progressStatus: 'uploading' },
  { stepId: 'scan', progressStatus: 'scanning' },
  { stepId: 'extract', progressStatus: 'extracting' },
  { stepId: 'classify', progressStatus: 'classifying' },
  { stepId: 'summarize', progressStatus: 'summarizing' },
] as const

export default function ScannerPage() {
  const {
    uploadedFile, previewUrl, analysisStatus, timelineSteps, currentAnalysis,
    setUploadedFile, setPreviewUrl, setAnalysisStatus, setCurrentAnalysis,
    setTimelineSteps, updateTimelineStep, addAnalysis,
  } = useVisionStore()

  // Camera input ref for mobile
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mobile accordion state for results section
  const [resultsOpen, setResultsOpen] = useState(true)
  const [timelineOpen, setTimelineOpen] = useState(false)

  useEffect(() => {
    return () => { if (previewUrl) URL.revokeObjectURL(previewUrl) }
  }, [previewUrl])

  const handleFileAccepted = useCallback((file: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setUploadedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setAnalysisStatus('idle')
    setCurrentAnalysis(null)
    setTimelineSteps(INITIAL_TIMELINE.map(s => ({ ...s, status: 'pending' as const })))
    // Auto-open results when file loaded
    setResultsOpen(true)
  }, [previewUrl, setUploadedFile, setPreviewUrl, setAnalysisStatus, setCurrentAnalysis, setTimelineSteps])

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileAccepted(file)
    // Reset input so same file can be selected again
    if (e.target) e.target.value = ''
  }

  const handleAnalyze = useCallback(async () => {
    if (!uploadedFile) return
    setAnalysisStatus('uploading')
    setCurrentAnalysis(null)
    setTimelineSteps(INITIAL_TIMELINE.map(s => ({ ...s, status: 'pending' as const, duration: undefined })))

    let stepIndex = 0
    const result = await analyzeDocument(uploadedFile, (progressStatus) => {
      if (stepIndex > 0) {
        updateTimelineStep(STEP_SEQUENCE[stepIndex - 1].stepId, {
          status: 'complete',
          duration: Math.floor(Math.random() * 600 + 300),
        })
      }
      updateTimelineStep(STEP_SEQUENCE[stepIndex].stepId, { status: 'running' })
      setAnalysisStatus(progressStatus as Parameters<typeof setAnalysisStatus>[0])
      stepIndex++
    })

    STEP_SEQUENCE.forEach(s => {
      updateTimelineStep(s.stepId, { status: 'complete', duration: Math.floor(Math.random() * 600 + 300) })
    })

    setCurrentAnalysis(result)
    addAnalysis(result)
    setAnalysisStatus('complete')
    setResultsOpen(true)
  }, [uploadedFile, setAnalysisStatus, setCurrentAnalysis, setTimelineSteps, updateTimelineStep, addAnalysis])

  const handleReset = useCallback(() => {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setUploadedFile(null)
    setPreviewUrl(null)
    setAnalysisStatus('idle')
    setCurrentAnalysis(null)
    setTimelineSteps(INITIAL_TIMELINE.map(s => ({ ...s, status: 'pending' as const, duration: undefined })))
  }, [previewUrl, setUploadedFile, setPreviewUrl, setAnalysisStatus, setCurrentAnalysis, setTimelineSteps])

  const isAnalyzing = ['uploading', 'scanning', 'extracting', 'classifying', 'summarizing'].includes(analysisStatus)

  return (
    <AppShell>
      {/* Hidden inputs for mobile camera / file gallery */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*,.pdf"
        capture="environment"
        onChange={handleCameraCapture}
        className="hidden"
        aria-hidden="true"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleCameraCapture}
        className="hidden"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto space-y-4">

        {/* Header bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
              <Brain className="w-3.5 h-3.5 text-cyan-400" />
            </div>
            <span className="text-xs text-slate-400 hidden sm:block">DeepNode AI · Demo Mode</span>
          </div>
          {currentAnalysis && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => exportAnalysisJSON(currentAnalysis)}>
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export JSON</span>
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">New Scan</span>
              </Button>
            </div>
          )}
        </div>

        {/* ── MOBILE: mobile-first camera buttons ── */}
        {!uploadedFile && (
          <div className="lg:hidden grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => cameraInputRef.current?.click()}
              className="flex flex-col items-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 text-cyan-400 active:bg-cyan-500/20 transition-all"
            >
              <Camera className="w-8 h-8" />
              <span className="text-sm font-semibold">Take Photo</span>
              <span className="text-xs text-cyan-400/60">Use camera</span>
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="flex flex-col items-center gap-2 rounded-2xl border border-violet-500/30 bg-violet-500/10 p-5 text-violet-400 active:bg-violet-500/20 transition-all"
            >
              <Upload className="w-8 h-8" />
              <span className="text-sm font-semibold">Upload File</span>
              <span className="text-xs text-violet-400/60">Gallery or PDF</span>
            </motion.button>
          </div>
        )}

        {/* Main two-column layout (stacked on mobile, side-by-side on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* ── LEFT: Upload / Preview ── */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <ScanLine className="w-4 h-4 text-cyan-400" />
                  Document
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uploadedFile ? (
                  <DocumentPreview
                    previewUrl={previewUrl}
                    fileName={uploadedFile.name}
                    fileType={uploadedFile.type}
                    status={analysisStatus}
                  />
                ) : (
                  /* Desktop drag-drop zone */
                  <div className="hidden lg:block">
                    <UploadZone onFileAccepted={handleFileAccepted} disabled={isAnalyzing} />
                  </div>
                )}

                {/* Mobile: after file is selected, show replace buttons */}
                {uploadedFile && (
                  <div className="mt-3 lg:hidden grid grid-cols-2 gap-2">
                    <button
                      onClick={() => cameraInputRef.current?.click()}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs text-slate-400 active:bg-white/10"
                    >
                      <Camera className="w-4 h-4" />
                      Retake
                    </button>
                    <button
                      onClick={handleReset}
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-xs text-slate-400 active:bg-white/10"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Clear
                    </button>
                  </div>
                )}

                {/* Desktop drag-drop for replace */}
                {uploadedFile && (
                  <div className="mt-3 hidden lg:block">
                    <UploadZone onFileAccepted={handleFileAccepted} disabled={isAnalyzing} />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analyze button */}
            <AnimatePresence>
              {uploadedFile && analysisStatus !== 'complete' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Button
                    size="lg"
                    className="w-full text-base py-4 lg:py-3"
                    onClick={handleAnalyze}
                    loading={isAnalyzing}
                    disabled={isAnalyzing}
                  >
                    <Brain className="w-5 h-5" />
                    {isAnalyzing ? 'Analyzing with AI...' : 'Analyze with AI'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Timeline — collapsible on mobile */}
            <Card>
              <button
                className="w-full flex items-center justify-between px-5 py-4 text-left"
                onClick={() => setTimelineOpen(p => !p)}
              >
                <span className="text-sm font-semibold text-white">Analysis Pipeline</span>
                <motion.div animate={{ rotate: timelineOpen ? 180 : 0 }}>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {timelineOpen && (
                  <motion.div
                    key="timeline"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <CardContent className="pt-0">
                      <AnalysisTimeline steps={timelineSteps} />
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Auto-expand when analyzing */}
              {isAnalyzing && !timelineOpen && (
                <CardContent className="pt-0">
                  <AnalysisTimeline steps={timelineSteps} />
                </CardContent>
              )}
            </Card>
          </div>

          {/* ── RIGHT: Results ── */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {currentAnalysis ? (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {/* Confidence card */}
                  <Card glow="cyan">
                    <CardContent className="flex items-center gap-4 py-5">
                      <ConfidenceMeter confidence={currentAnalysis.confidence} size="md" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Result</p>
                        <p className="text-white font-display font-semibold text-sm leading-tight">
                          {currentAnalysis.documentTypeLabel}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 truncate">
                          {currentAnalysis.processingTime}ms · {currentAnalysis.fileName}
                        </p>
                        {currentAnalysis.warnings.length > 0 && (
                          <p className="text-xs text-amber-400 mt-1">
                            ⚠ {currentAnalysis.warnings.length} warning{currentAnalysis.warnings.length > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Extracted data — collapsible on mobile */}
                  <Card>
                    <button
                      className="w-full flex items-center justify-between px-5 py-4 text-left lg:cursor-default"
                      onClick={() => setResultsOpen(p => !p)}
                    >
                      <span className="text-sm font-semibold text-white">Extracted Data</span>
                      <motion.div animate={{ rotate: resultsOpen ? 180 : 0 }} className="lg:hidden">
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {(resultsOpen) && (
                        <motion.div
                          key="extraction-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <CardContent className="pt-0">
                            <ExtractionPanel result={currentAnalysis} />
                          </CardContent>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </Card>

                  {/* Action buttons — large touch targets on mobile */}
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="primary"
                      className="py-4 lg:py-2 text-sm"
                      onClick={() => exportAnalysisJSON(currentAnalysis)}
                    >
                      <Download className="w-4 h-4" />
                      Export JSON
                    </Button>
                    <Button
                      variant="ghost"
                      className="py-4 lg:py-2 text-sm"
                      onClick={handleReset}
                    >
                      <RefreshCw className="w-4 h-4" />
                      New Scan
                    </Button>
                  </div>

                  {/* Saved confirmation */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3"
                  >
                    <Save className="w-4 h-4 text-emerald-400 shrink-0" />
                    <p className="text-xs text-emerald-400">Analysis saved to history automatically</p>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className="min-h-[260px] lg:min-h-[400px] flex items-center justify-center">
                    <CardContent className="text-center py-12">
                      <motion.div
                        animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-3"
                      >
                        <Brain className="w-6 h-6 text-slate-600" />
                      </motion.div>
                      <p className="text-slate-500 text-sm">
                        {uploadedFile ? 'Tap "Analyze with AI" to start' : 'Upload or take a photo to begin'}
                      </p>
                      <p className="text-slate-700 text-xs mt-1">PDF · JPG · PNG · WEBP</p>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
