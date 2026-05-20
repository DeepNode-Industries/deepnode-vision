'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { VisionAnalysisResult, AnalysisStatus, TimelineStep } from '@/lib/types'

interface VisionStoreState {
  analyses: VisionAnalysisResult[]
  currentAnalysis: VisionAnalysisResult | null
  analysisStatus: AnalysisStatus
  timelineSteps: TimelineStep[]
  uploadedFile: File | null
  previewUrl: string | null

  addAnalysis: (analysis: VisionAnalysisResult) => void
  removeAnalysis: (id: string) => void
  setCurrentAnalysis: (analysis: VisionAnalysisResult | null) => void
  setAnalysisStatus: (status: AnalysisStatus) => void
  setTimelineSteps: (steps: TimelineStep[]) => void
  updateTimelineStep: (id: string, updates: Partial<TimelineStep>) => void
  setUploadedFile: (file: File | null) => void
  setPreviewUrl: (url: string | null) => void
  clearHistory: () => void
}

const INITIAL_TIMELINE: TimelineStep[] = [
  { id: 'upload', label: 'File Upload', status: 'pending' },
  { id: 'scan', label: 'Document Scan', status: 'pending' },
  { id: 'extract', label: 'Text Extraction (OCR)', status: 'pending' },
  { id: 'classify', label: 'Document Classification', status: 'pending' },
  { id: 'summarize', label: 'AI Summary Generation', status: 'pending' },
]

export const useVisionStore = create<VisionStoreState>()(
  persist(
    (set) => ({
      analyses: [],
      currentAnalysis: null,
      analysisStatus: 'idle',
      timelineSteps: INITIAL_TIMELINE,
      uploadedFile: null,
      previewUrl: null,

      addAnalysis: (analysis) =>
        set((state) => ({
          analyses: [analysis, ...state.analyses].slice(0, 100),
        })),

      removeAnalysis: (id) =>
        set((state) => ({
          analyses: state.analyses.filter((a) => a.id !== id),
          currentAnalysis: state.currentAnalysis?.id === id ? null : state.currentAnalysis,
        })),

      setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),

      setAnalysisStatus: (status) => set({ analysisStatus: status }),

      setTimelineSteps: (steps) => set({ timelineSteps: steps }),

      updateTimelineStep: (id, updates) =>
        set((state) => ({
          timelineSteps: state.timelineSteps.map((step) =>
            step.id === id ? { ...step, ...updates } : step
          ),
        })),

      setUploadedFile: (file) => set({ uploadedFile: file }),

      setPreviewUrl: (url) => set({ previewUrl: url }),

      clearHistory: () => set({ analyses: [], currentAnalysis: null }),
    }),
    {
      name: 'dnv-vision-store',
      // Only persist analyses — not transient state
      partialize: (state) => ({ analyses: state.analyses }),
    }
  )
)

export { INITIAL_TIMELINE }
