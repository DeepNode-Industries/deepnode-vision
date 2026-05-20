import type { VisionAnalysisResult } from './types'

const STORAGE_KEY = 'dnv_analyses'

export function saveAnalysis(analysis: VisionAnalysisResult): void {
  try {
    const existing = loadAnalyses()
    const updated = [analysis, ...existing].slice(0, 100) // keep last 100
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    console.warn('Failed to save analysis to localStorage')
  }
}

export function loadAnalyses(): VisionAnalysisResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as VisionAnalysisResult[]
  } catch {
    return []
  }
}

export function deleteAnalysis(id: string): void {
  try {
    const existing = loadAnalyses()
    const updated = existing.filter(a => a.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    console.warn('Failed to delete analysis from localStorage')
  }
}

export function clearAllAnalyses(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    console.warn('Failed to clear analyses from localStorage')
  }
}

export function getAnalysisById(id: string): VisionAnalysisResult | null {
  const analyses = loadAnalyses()
  return analyses.find(a => a.id === id) ?? null
}

export function exportAnalysisJSON(analysis: VisionAnalysisResult): void {
  const blob = new Blob([analysis.rawJson], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `dnv_${analysis.fileName.replace(/\.[^.]+$/, '')}_${analysis.id}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
