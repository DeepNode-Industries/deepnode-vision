import { useState, useCallback } from 'react'
import {
  View, Text, ScrollView, Image, TouchableOpacity,
  StyleSheet, ActivityIndicator, Pressable,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Camera, Upload, FileText, Brain, RefreshCw, Download, ChevronDown, Save } from 'lucide-react-native'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'

import { useVisionStore, INITIAL_TIMELINE } from '@/store/vision-store'
import { analyzeDocument } from '@/lib/vision-engine'
import { exportAnalysisJSON } from '@/lib/storage'
import { takePicture, pickFromGallery, pickDocument, nativeAssetToFile } from '@/lib/native-camera'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button, BtnText } from '@/components/ui/button'
import { ConfidenceMeter } from '@/components/vision/confidence-meter'
import { AnalysisTimeline } from '@/components/vision/analysis-timeline'
import { ExtractionPanel } from '@/components/vision/extraction-panel'
import { ScanAnimation } from '@/components/vision/scan-animation'

const STEP_IDS = ['upload', 'scan', 'extract', 'classify', 'summarize'] as const

export default function ScannerScreen() {
  const {
    currentAnalysis, analysisStatus, timelineSteps, currentUri,
    setCurrentAnalysis, setAnalysisStatus, setTimelineSteps,
    updateTimelineStep, addAnalysis, setCurrentUri,
  } = useVisionStore()

  const [timelineOpen, setTimelineOpen] = useState(false)
  const [cameraLoading, setCameraLoading] = useState(false)
  const [galleryLoading, setGalleryLoading] = useState(false)

  const tlRotation = useSharedValue(0)
  const tlStyle = useAnimatedStyle(() => ({ transform: [{ rotate: `${tlRotation.value}deg` }] }))

  const toggleTimeline = () => {
    setTimelineOpen(p => !p)
    tlRotation.value = withTiming(timelineOpen ? 0 : 180, { duration: 200 })
  }

  const isAnalyzing = ['uploading', 'scanning', 'extracting', 'classifying', 'summarizing'].includes(analysisStatus)

  const handleTakePhoto = useCallback(async () => {
    setCameraLoading(true)
    try {
      const asset = await takePicture()
      if (!asset) return
      setCurrentUri(asset.uri)
      setCurrentAnalysis(null)
      setAnalysisStatus('idle')
      setTimelineSteps(INITIAL_TIMELINE.map(s => ({ ...s, status: 'pending' as const })))
    } finally {
      setCameraLoading(false)
    }
  }, [])

  const handlePickGallery = useCallback(async () => {
    setGalleryLoading(true)
    try {
      const asset = await pickFromGallery() ?? await pickDocument()
      if (!asset) return
      setCurrentUri(asset.uri)
      setCurrentAnalysis(null)
      setAnalysisStatus('idle')
      setTimelineSteps(INITIAL_TIMELINE.map(s => ({ ...s, status: 'pending' as const })))
    } finally {
      setGalleryLoading(false)
    }
  }, [])

  const handleAnalyze = useCallback(async () => {
    if (!currentUri) return
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    // Build a minimal File-like object (vision engine only reads .name, .size, .type)
    const mockFile = nativeAssetToFile({
      uri: currentUri,
      name: `scan_${Date.now()}.jpg`,
      size: 400_000,
      type: 'image/jpeg',
    })

    setAnalysisStatus('uploading')
    setCurrentAnalysis(null)
    setTimelineSteps(INITIAL_TIMELINE.map(s => ({ ...s, status: 'pending' as const })))
    setTimelineOpen(true)
    tlRotation.value = withTiming(180, { duration: 200 })

    let stepIndex = 0
    const result = await analyzeDocument(mockFile, (progressStatus) => {
      if (stepIndex > 0) {
        updateTimelineStep(STEP_IDS[stepIndex - 1], { status: 'complete', duration: Math.floor(Math.random() * 600 + 300) })
      }
      updateTimelineStep(STEP_IDS[stepIndex], { status: 'running' })
      setAnalysisStatus(progressStatus as any)
      stepIndex++
    })

    STEP_IDS.forEach(id => updateTimelineStep(id, { status: 'complete', duration: Math.floor(Math.random() * 600 + 300) }))
    setCurrentAnalysis(result)
    addAnalysis(result)
    setAnalysisStatus('complete')
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
  }, [currentUri])

  const handleReset = useCallback(() => {
    setCurrentUri(null)
    setCurrentAnalysis(null)
    setAnalysisStatus('idle')
    setTimelineSteps(INITIAL_TIMELINE.map(s => ({ ...s, status: 'pending' as const })))
    setTimelineOpen(false)
    tlRotation.value = withTiming(0, { duration: 200 })
  }, [])

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.headerIcon}>
              <Brain size={16} color="#22d3ee" />
            </View>
            <Text style={styles.headerTitle}>AI Scanner</Text>
          </View>
          <View style={styles.headerBadge}>
            <View style={styles.dot} />
            <Text style={styles.headerBadgeText}>Demo Mode</Text>
          </View>
        </View>

        {/* Camera buttons — shown when no image selected */}
        {!currentUri && (
          <View style={styles.cameraGrid}>
            <TouchableOpacity
              style={styles.cameraBtn}
              activeOpacity={0.75}
              onPress={handleTakePhoto}
              disabled={cameraLoading}
            >
              {cameraLoading
                ? <ActivityIndicator color="#22d3ee" size="large" />
                : <Camera size={36} color="#22d3ee" strokeWidth={1.5} />
              }
              <Text style={styles.cameraBtnTitle}>Take Photo</Text>
              <Text style={styles.cameraBtnSub}>Use camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cameraBtn, styles.cameraBtnPurple]}
              activeOpacity={0.75}
              onPress={handlePickGallery}
              disabled={galleryLoading}
            >
              {galleryLoading
                ? <ActivityIndicator color="#a78bfa" size="large" />
                : <Upload size={36} color="#a78bfa" strokeWidth={1.5} />
              }
              <Text style={[styles.cameraBtnTitle, styles.cameraBtnTitlePurple]}>Upload File</Text>
              <Text style={[styles.cameraBtnSub, styles.cameraBtnSubPurple]}>Gallery or PDF</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Document Preview */}
        {currentUri && (
          <Card style={styles.previewCard}>
            <View style={styles.previewWrap}>
              <Image source={{ uri: currentUri }} style={styles.previewImg} resizeMode="contain" />
              {isAnalyzing && <ScanAnimation height={200} />}
            </View>
            <View style={styles.previewActions}>
              <TouchableOpacity style={styles.smallBtn} onPress={handleTakePhoto} disabled={isAnalyzing}>
                <Camera size={15} color="#94a3b8" />
                <Text style={styles.smallBtnText}>Retake</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.smallBtn} onPress={handleReset} disabled={isAnalyzing}>
                <RefreshCw size={15} color="#94a3b8" />
                <Text style={styles.smallBtnText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </Card>
        )}

        {/* Analyze button */}
        {currentUri && analysisStatus !== 'complete' && (
          <TouchableOpacity
            style={[styles.analyzeBtn, isAnalyzing && styles.analyzeBtnDisabled]}
            activeOpacity={0.8}
            onPress={handleAnalyze}
            disabled={isAnalyzing}
          >
            {isAnalyzing
              ? <ActivityIndicator color="#fff" />
              : <Brain size={20} color="#fff" />
            }
            <Text style={styles.analyzeBtnText}>
              {isAnalyzing ? 'Analyzing with AI…' : 'Analyze with AI'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Timeline collapsible */}
        {currentUri && (
          <Card>
            <TouchableOpacity style={styles.tlHeader} onPress={toggleTimeline} activeOpacity={0.7}>
              <Text style={styles.tlTitle}>Analysis Pipeline</Text>
              <Animated.View style={tlStyle}>
                <ChevronDown size={16} color="#64748b" />
              </Animated.View>
            </TouchableOpacity>
            {(timelineOpen || isAnalyzing) && (
              <CardContent>
                <AnalysisTimeline steps={timelineSteps} />
              </CardContent>
            )}
          </Card>
        )}

        {/* Results */}
        {currentAnalysis && (
          <View style={styles.results}>
            {/* Confidence card */}
            <Card glow="cyan">
              <CardContent style={styles.confidenceRow}>
                <ConfidenceMeter confidence={currentAnalysis.confidence} size="md" />
                <View style={styles.confidenceInfo}>
                  <Text style={styles.confidenceLabel}>Result</Text>
                  <Text style={styles.confidenceType}>{currentAnalysis.documentTypeLabel}</Text>
                  <Text style={styles.confidenceMeta}>
                    {currentAnalysis.processingTime}ms · {currentAnalysis.fileName}
                  </Text>
                  {currentAnalysis.warnings.length > 0 && (
                    <Text style={styles.confidenceWarn}>
                      ⚠ {currentAnalysis.warnings.length} warning{currentAnalysis.warnings.length > 1 ? 's' : ''}
                    </Text>
                  )}
                </View>
              </CardContent>
            </Card>

            {/* Extracted Data */}
            <Card>
              <CardHeader>
                <CardTitle>Extracted Data</CardTitle>
              </CardHeader>
              <CardContent>
                <ExtractionPanel result={currentAnalysis} />
              </CardContent>
            </Card>

            {/* Action buttons */}
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() => exportAnalysisJSON(currentAnalysis)}
                activeOpacity={0.75}
              >
                <Download size={16} color="#fff" />
                <Text style={styles.actionBtnText}>Export JSON</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, styles.actionBtnGhost]}
                onPress={handleReset}
                activeOpacity={0.75}
              >
                <RefreshCw size={16} color="#94a3b8" />
                <Text style={[styles.actionBtnText, styles.actionBtnTextGhost]}>New Scan</Text>
              </TouchableOpacity>
            </View>

            {/* Saved confirmation */}
            <View style={styles.savedBanner}>
              <Save size={14} color="#34d399" />
              <Text style={styles.savedText}>Analysis saved to history automatically</Text>
            </View>
          </View>
        )}

        {/* Empty state */}
        {!currentUri && (
          <Card style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Brain size={28} color="#334155" />
            </View>
            <Text style={styles.emptyText}>Upload or take a photo to begin</Text>
            <Text style={styles.emptyHint}>PDF · JPG · PNG · WEBP</Text>
          </Card>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#020817' },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 12, paddingBottom: 32 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  headerIcon: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: 'rgba(6,182,212,0.15)', borderWidth: 1, borderColor: 'rgba(6,182,212,0.3)',
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 16, color: '#f1f5f9' },
  headerBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
    backgroundColor: 'rgba(16,185,129,0.1)', borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)',
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981' },
  headerBadgeText: { fontSize: 11, fontFamily: 'Inter-Medium', color: '#34d399' },

  cameraGrid: { flexDirection: 'row', gap: 12 },
  cameraBtn: {
    flex: 1, alignItems: 'center', gap: 8, padding: 22,
    borderRadius: 18, borderWidth: 1, borderColor: 'rgba(6,182,212,0.3)',
    backgroundColor: 'rgba(6,182,212,0.08)',
  },
  cameraBtnPurple: { borderColor: 'rgba(139,92,246,0.3)', backgroundColor: 'rgba(139,92,246,0.08)' },
  cameraBtnTitle: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#22d3ee' },
  cameraBtnTitlePurple: { color: '#a78bfa' },
  cameraBtnSub: { fontFamily: 'Inter-Regular', fontSize: 11, color: 'rgba(34,211,238,0.5)' },
  cameraBtnSubPurple: { color: 'rgba(167,139,250,0.5)' },

  previewCard: {},
  previewWrap: { height: 220, overflow: 'hidden', position: 'relative', borderRadius: 14 },
  previewImg: { width: '100%', height: '100%' },
  previewActions: { flexDirection: 'row', gap: 8, padding: 10, paddingTop: 8 },
  smallBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 10, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  smallBtnText: { fontFamily: 'Inter-Medium', fontSize: 13, color: '#94a3b8' },

  analyzeBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    paddingVertical: 16, borderRadius: 14,
    backgroundColor: '#0891b2', borderWidth: 1, borderColor: '#06b6d4',
    shadowColor: '#06b6d4', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12,
    elevation: 6,
  },
  analyzeBtnDisabled: { opacity: 0.6 },
  analyzeBtnText: { fontFamily: 'Inter-SemiBold', fontSize: 16, color: '#fff' },

  tlHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  tlTitle: { fontFamily: 'SpaceGrotesk-SemiBold', fontSize: 14, color: '#f1f5f9' },

  results: { gap: 12 },
  confidenceRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  confidenceInfo: { flex: 1 },
  confidenceLabel: { fontSize: 10, fontFamily: 'Inter-Medium', color: '#475569', textTransform: 'uppercase', letterSpacing: 0.8 },
  confidenceType: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 15, color: '#fff', marginTop: 2 },
  confidenceMeta: { fontSize: 11, fontFamily: 'Inter-Regular', color: '#475569', marginTop: 4 },
  confidenceWarn: { fontSize: 11, fontFamily: 'Inter-Medium', color: '#fbbf24', marginTop: 2 },

  actionRow: { flexDirection: 'row', gap: 10 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    paddingVertical: 14, borderRadius: 12,
    backgroundColor: '#0891b2', borderWidth: 1, borderColor: '#06b6d4',
  },
  actionBtnGhost: { backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' },
  actionBtnText: { fontFamily: 'Inter-SemiBold', fontSize: 14, color: '#fff' },
  actionBtnTextGhost: { color: '#94a3b8' },

  savedBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    paddingHorizontal: 14, paddingVertical: 12, borderRadius: 12,
    backgroundColor: 'rgba(16,185,129,0.07)', borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)',
  },
  savedText: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#34d399' },

  emptyCard: { alignItems: 'center', paddingVertical: 48 },
  emptyIcon: {
    width: 60, height: 60, borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center', justifyContent: 'center', marginBottom: 12,
  },
  emptyText: { fontFamily: 'Inter-Regular', fontSize: 14, color: '#475569' },
  emptyHint: { fontFamily: 'Inter-Regular', fontSize: 12, color: '#1e293b', marginTop: 4 },
})
