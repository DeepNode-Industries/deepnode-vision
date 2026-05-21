import { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Share } from 'react-native'
import { Copy, FileJson, AlignLeft, Grid3x3, Sparkles } from 'lucide-react-native'
import * as Haptics from 'expo-haptics'
import type { VisionAnalysisResult } from '@/lib/types'
import { ConfidenceBadge } from '@/components/ui/badge'

const TABS = [
  { id: 'fields', label: 'Fields', icon: Grid3x3 },
  { id: 'summary', label: 'Summary', icon: Sparkles },
  { id: 'ocr', label: 'OCR Text', icon: AlignLeft },
  { id: 'json', label: 'JSON', icon: FileJson },
]

export function ExtractionPanel({ result }: { result: VisionAnalysisResult }) {
  const [tab, setTab] = useState('fields')

  return (
    <View style={styles.container}>
      {/* Tab strip */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {TABS.map(({ id, label, icon: Icon }) => (
          <TouchableOpacity
            key={id}
            onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setTab(id) }}
            style={[styles.tab, tab === id && styles.tabActive]}
          >
            <Icon size={13} color={tab === id ? '#22d3ee' : '#64748b'} />
            <Text style={[styles.tabLabel, tab === id && styles.tabLabelActive]}>{label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <View style={styles.content}>
        {tab === 'fields' && (
          <View style={styles.fieldList}>
            {result.extractedFields.map((field) => (
              <View key={field.key} style={styles.fieldRow}>
                <Text style={styles.fieldKey}>{field.key.replace(/_/g, ' ')}</Text>
                <View style={styles.fieldRight}>
                  <Text style={styles.fieldValue} numberOfLines={2}>{field.value}</Text>
                  <ConfidenceBadge confidence={field.confidence} />
                </View>
              </View>
            ))}
          </View>
        )}

        {tab === 'summary' && (
          <View style={styles.textBlock}>
            <Text style={styles.summaryText}>{result.summary}</Text>
            {result.suggestedActions.length > 0 && (
              <View style={styles.actionsBlock}>
                <Text style={styles.actionsTitle}>Suggested Actions</Text>
                {result.suggestedActions.map((action, i) => (
                  <View key={i} style={styles.actionRow}>
                    <View style={styles.actionDot} />
                    <Text style={styles.actionText}>{action}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {tab === 'ocr' && (
          <ScrollView style={styles.ocrScroll} nestedScrollEnabled>
            <Text style={styles.ocrText} selectable>{result.extractedText}</Text>
          </ScrollView>
        )}

        {tab === 'json' && (
          <View>
            <TouchableOpacity
              style={styles.copyBtn}
              onPress={async () => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                await Share.share({ message: result.rawJson, title: 'Analysis JSON' })
              }}
            >
              <Copy size={14} color="#22d3ee" />
              <Text style={styles.copyBtnText}>Share JSON</Text>
            </TouchableOpacity>
            <ScrollView style={styles.jsonScroll} nestedScrollEnabled>
              <Text style={styles.jsonText} selectable>{result.rawJson}</Text>
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  tabBar: { flexDirection: 'row', marginBottom: 12 },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 7,
    borderRadius: 8, marginRight: 6,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1, borderColor: 'transparent',
  },
  tabActive: {
    backgroundColor: 'rgba(6,182,212,0.1)',
    borderColor: 'rgba(6,182,212,0.3)',
  },
  tabLabel: { fontSize: 12, fontFamily: 'Inter-Medium', color: '#64748b' },
  tabLabelActive: { color: '#22d3ee' },
  content: {},
  fieldList: { gap: 8 },
  fieldRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 8, paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)',
    gap: 12,
  },
  fieldKey: { fontSize: 12, fontFamily: 'Inter-Medium', color: '#64748b', flex: 1, textTransform: 'capitalize' },
  fieldRight: { flex: 2, alignItems: 'flex-end', gap: 4 },
  fieldValue: { fontSize: 13, fontFamily: 'Inter-SemiBold', color: '#e2e8f0', textAlign: 'right' },
  textBlock: { gap: 12 },
  summaryText: { fontSize: 13, fontFamily: 'Inter-Regular', color: '#94a3b8', lineHeight: 20 },
  actionsBlock: { gap: 6, marginTop: 4 },
  actionsTitle: { fontSize: 11, fontFamily: 'Inter-SemiBold', color: '#475569', textTransform: 'uppercase', letterSpacing: 0.8 },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  actionDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#06b6d4' },
  actionText: { fontSize: 13, fontFamily: 'Inter-Regular', color: '#94a3b8' },
  ocrScroll: { maxHeight: 200 },
  ocrText: { fontSize: 12, fontFamily: 'Inter-Regular', color: '#64748b', lineHeight: 18 },
  jsonScroll: { maxHeight: 200 },
  jsonText: { fontSize: 11, fontFamily: 'Inter-Regular', color: '#34d399', lineHeight: 17 },
  copyBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    alignSelf: 'flex-end', marginBottom: 8,
    paddingHorizontal: 12, paddingVertical: 6,
    backgroundColor: 'rgba(6,182,212,0.1)',
    borderRadius: 8, borderWidth: 1, borderColor: 'rgba(6,182,212,0.3)',
  },
  copyBtnText: { fontSize: 12, fontFamily: 'Inter-SemiBold', color: '#22d3ee' },
})
