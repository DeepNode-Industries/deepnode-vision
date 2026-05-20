export type DocumentType =
  | 'invoice'
  | 'receipt'
  | 'payment_receipt'
  | 'vehicle_plate'
  | 'contract'
  | 'id_document'
  | 'product_image'
  | 'report'
  | 'cfdi'
  | 'unknown'

export type AnalysisStatus = 'idle' | 'uploading' | 'scanning' | 'extracting' | 'classifying' | 'summarizing' | 'complete' | 'error'

export interface ExtractedField {
  key: string
  value: string
  confidence: number
  bbox?: { x: number; y: number; width: number; height: number }
}

export interface AnalysisWarning {
  code: string
  message: string
  severity: 'low' | 'medium' | 'high'
}

export interface TimelineStep {
  id: string
  label: string
  status: 'pending' | 'running' | 'complete' | 'error'
  duration?: number
  timestamp?: string
}

export interface VisionAnalysisResult {
  id: string
  documentType: DocumentType
  documentTypeLabel: string
  confidence: number
  extractedText: string
  fields: Record<string, string>
  extractedFields: ExtractedField[]
  summary: string
  warnings: AnalysisWarning[]
  suggestedActions: string[]
  processingTime: number
  rawJson: string
  timestamp: string
  fileName: string
  fileSize: number
  fileType: string
  previewUrl?: string
  tags: string[]
}

export interface DashboardMetrics {
  totalDocuments: number
  averageConfidence: number
  totalProcessingTime: number
  aiValidations: number
  weeklyData: WeeklyDataPoint[]
  documentTypeDistribution: DocumentTypeCount[]
}

export interface WeeklyDataPoint {
  day: string
  documents: number
  confidence: number
}

export interface DocumentTypeCount {
  type: string
  count: number
  color: string
}

export interface AnalyticsData {
  totalDocuments: number
  byCategory: DocumentTypeCount[]
  averageConfidence: number
  errorsCount: number
  estimatedTimeSaved: number
  dailyData: DailyDataPoint[]
  commonWarnings: WarningCount[]
}

export interface DailyDataPoint {
  date: string
  documents: number
  avgConfidence: number
}

export interface WarningCount {
  message: string
  count: number
}

export interface Template {
  id: string
  name: string
  description: string
  documentType: DocumentType
  icon: string
  fields: string[]
  color: string
  category: string
}

export interface VisionStore {
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
