import AsyncStorage from '@react-native-async-storage/async-storage'
import { Share } from 'react-native'
import type { VisionAnalysisResult } from './types'

const STORAGE_KEY = 'dnv_analyses'

export async function saveAnalysis(analysis: VisionAnalysisResult): Promise<void> {
  try {
    const existing = await loadAnalyses()
    const updated = [analysis, ...existing].slice(0, 100)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    console.warn('Failed to save analysis')
  }
}

export async function loadAnalyses(): Promise<VisionAnalysisResult[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as VisionAnalysisResult[]
  } catch {
    return []
  }
}

export async function deleteAnalysis(id: string): Promise<void> {
  try {
    const existing = await loadAnalyses()
    const updated = existing.filter(a => a.id !== id)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    console.warn('Failed to delete analysis')
  }
}

export async function clearAllAnalyses(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY)
  } catch {
    console.warn('Failed to clear analyses')
  }
}

export async function getAnalysisById(id: string): Promise<VisionAnalysisResult | null> {
  const analyses = await loadAnalyses()
  return analyses.find(a => a.id === id) ?? null
}

/** Share analysis JSON via native Share sheet */
export async function exportAnalysisJSON(analysis: VisionAnalysisResult): Promise<void> {
  const fileName = `dnv_${analysis.fileName.replace(/\.[^.]+$/, '')}_${analysis.id}.json`
  await Share.share({
    message: analysis.rawJson,
    title: fileName,
  })
}
