import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { VisionAnalysisResult, AnalysisStatus, TimelineStep } from '@/lib/types'

interface VisionStoreState {
  analyses: VisionAnalysisResult[]
  currentAnalysis: VisionAnalysisResult | null
  analysisStatus: AnalysisStatus
  timelineSteps: TimelineStep[]
  currentUri: string | null   // image URI (replaces previewUrl / File)

  addAnalysis: (analysis: VisionAnalysisResult) => void
  removeAnalysis: (id: string) => void
  setCurrentAnalysis: (analysis: VisionAnalysisResult | null) => void
  setAnalysisStatus: (status: AnalysisStatus) => void
  setTimelineSteps: (steps: TimelineStep[]) => void
  updateTimelineStep: (id: string, updates: Partial<TimelineStep>) => void
  setCurrentUri: (uri: string | null) => void
  clearHistory: () => void
}

export const INITIAL_TIMELINE: TimelineStep[] = [
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
      currentUri: null,

      addAnalysis: (analysis) =>
        set((s) => ({ analyses: [analysis, ...s.analyses].slice(0, 100) })),

      removeAnalysis: (id) =>
        set((s) => ({
          analyses: s.analyses.filter((a) => a.id !== id),
          currentAnalysis: s.currentAnalysis?.id === id ? null : s.currentAnalysis,
        })),

      setCurrentAnalysis: (analysis) => set({ currentAnalysis: analysis }),
      setAnalysisStatus: (status) => set({ analysisStatus: status }),
      setTimelineSteps: (steps) => set({ timelineSteps: steps }),

      updateTimelineStep: (id, updates) =>
        set((s) => ({
          timelineSteps: s.timelineSteps.map((step) =>
            step.id === id ? { ...step, ...updates } : step
          ),
        })),

      setCurrentUri: (uri) => set({ currentUri: uri }),
      clearHistory: () => set({ analyses: [], currentAnalysis: null }),
    }),
    {
      name: 'dnv-vision-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ analyses: s.analyses }),
    }
  )
)
