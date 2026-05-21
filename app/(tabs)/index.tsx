import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LayoutDashboard, ScanLine, Files, TrendingUp, Zap, ChevronRight } from 'lucide-react-native'
import { router } from 'expo-router'
import { useVisionStore } from '@/store/vision-store'
import { MOCK_ANALYSES, MOCK_WEEKLY_DATA, MOCK_DOCUMENT_TYPES } from '@/lib/mock-data'
import { MetricCard } from '@/components/dashboard/metric-card'
import { UsageChart } from '@/components/dashboard/usage-chart'
import { DocumentTypeChart } from '@/components/dashboard/document-type-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ConfidenceBadge } from '@/components/ui/badge'
import { formatTimestamp, formatFileSize } from '@/lib/utils'

export default function DashboardScreen() {
  const { analyses } = useVisionStore()
  const data = analyses.length > 0 ? analyses : MOCK_ANALYSES
  const recent = data.slice(0, 5)

  const avgConf = Math.round(data.reduce((s, a) => s + a.confidence, 0) / (data.length || 1))
  const totalTime = data.reduce((s, a) => s + a.processingTime, 0)

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Dashboard</Text>
            <Text style={styles.subtitle}>Overview & activity</Text>
          </View>
          <TouchableOpacity
            style={styles.scanShortcut}
            onPress={() => router.push('/(tabs)/scanner')}
            activeOpacity={0.75}
          >
            <ScanLine size={14} color="#22d3ee" />
            <Text style={styles.scanShortcutText}>Scan</Text>
            <ChevronRight size={12} color="#22d3ee" />
          </TouchableOpacity>
        </View>

        {/* Metrics grid */}
        <View style={styles.metricsGrid}>
          <MetricCard title="Total Docs" value={data.length} subtitle="all time" icon={Files} color="#06b6d4" />
          <MetricCard title="Avg Confidence" value={`${avgConf}%`} subtitle="accuracy" icon={Zap} color="#8b5cf6" />
          <MetricCard title="Processed" value={totalTime > 1000 ? `${(totalTime / 1000).toFixed(1)}s` : `${totalTime}ms`} subtitle="total time" icon={TrendingUp} color="#10b981" />
          <MetricCard title="AI Scans" value={data.length} subtitle="this session" icon={LayoutDashboard} color="#f59e0b" />
        </View>

        {/* Weekly chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageChart data={MOCK_WEEKLY_DATA} />
          </CardContent>
        </Card>

        {/* Document types */}
        <Card>
          <CardHeader>
            <CardTitle>Document Types</CardTitle>
          </CardHeader>
          <CardContent>
            <DocumentTypeChart data={MOCK_DOCUMENT_TYPES} />
          </CardContent>
        </Card>

        {/* Recent analyses */}
        <Card>
          <CardHeader style={styles.recentHeader}>
            <CardTitle>Recent Analyses</CardTitle>
            <TouchableOpacity onPress={() => router.push('/(tabs)/documents')}>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </CardHeader>
          <View>
            {recent.map((a, i) => (
              <View key={a.id} style={[styles.analysisRow, i < recent.length - 1 && styles.analysisRowBorder]}>
                <View style={styles.analysisIcon}>
                  <Files size={14} color="#06b6d4" />
                </View>
                <View style={styles.analysisInfo}>
                  <Text style={styles.analysisName} numberOfLines={1}>{a.fileName}</Text>
                  <Text style={styles.analysisMeta}>{a.documentTypeLabel} · {formatTimestamp(a.timestamp)}</Text>
                </View>
                <ConfidenceBadge confidence={a.confidence} />
              </View>
            ))}
          </View>
        </Card>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#020817' },
  content: { padding: 16, gap: 12, paddingBottom: 32 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
  greeting: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, color: '#f1f5f9' },
  subtitle: { fontFamily: 'Inter-Regular', fontSize: 13, color: '#475569', marginTop: 2 },
  scanShortcut: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10,
    backgroundColor: 'rgba(6,182,212,0.1)', borderWidth: 1, borderColor: 'rgba(6,182,212,0.3)',
  },
  scanShortcutText: { fontFamily: 'Inter-SemiBold', fontSize: 13, color: '#22d3ee' },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  recentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  viewAll: { fontFamily: 'Inter-Medium', fontSize: 12, color: '#0891b2' },
  analysisRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingVertical: 12 },
  analysisRowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: 'rgba(255,255,255,0.05)' },
  analysisIcon: {
    width: 32, height: 32, borderRadius: 9,
    backgroundColor: 'rgba(6,182,212,0.1)', borderWidth: 1, borderColor: 'rgba(6,182,212,0.2)',
    alignItems: 'center', justifyContent: 'center',
  },
  analysisInfo: { flex: 1 },
  analysisName: { fontFamily: 'Inter-Medium', fontSize: 13, color: '#e2e8f0' },
  analysisMeta: { fontFamily: 'Inter-Regular', fontSize: 11, color: '#475569', marginTop: 2 },
})
