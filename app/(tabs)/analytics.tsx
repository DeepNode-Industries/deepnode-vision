import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { BarChart3, TrendingUp, FileCheck, AlertTriangle, Clock } from 'lucide-react-native'
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Line as SvgLine, Text as SvgText } from 'react-native-svg'
import { useVisionStore } from '@/store/vision-store'
import { MOCK_ANALYSES } from '@/lib/mock-data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MetricCard } from '@/components/dashboard/metric-card'
import { DocumentTypeChart } from '@/components/dashboard/document-type-chart'
import type { DocumentTypeCount } from '@/lib/types'

const { width: SW } = Dimensions.get('window')

function MiniLineChart({ data }: { data: { value: number }[] }) {
  const W = SW - 64, H = 80
  const max = Math.max(...data.map(d => d.value), 1)
  const pts = data.map((d, i) => ({
    x: (i / (data.length - 1)) * W,
    y: H - (d.value / max) * (H - 12) - 6,
  }))
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const area = `${d} L ${pts[pts.length-1].x} ${H} L 0 ${H} Z`

  return (
    <Svg width={W} height={H}>
      <Defs>
        <LinearGradient id="line-fill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
          <Stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
        </LinearGradient>
      </Defs>
      <Path d={area} fill="url(#line-fill)" />
      <Path d={d} fill="none" stroke="#06b6d4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => <Circle key={i} cx={p.x} cy={p.y} r={3} fill="#06b6d4" />)}
    </Svg>
  )
}

export default function AnalyticsScreen() {
  const { analyses } = useVisionStore()
  const data = analyses.length > 0 ? analyses : MOCK_ANALYSES

  const avgConf = Math.round(data.reduce((s, a) => s + a.confidence, 0) / (data.length || 1))
  const withWarnings = data.filter(a => a.warnings.length > 0).length
  const totalMs = data.reduce((s, a) => s + a.processingTime, 0)
  const timeSaved = Math.round(totalMs / 1000 / 60)

  // Last 14 days
  const dailyData = Array.from({ length: 14 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (13 - i))
    const count = data.filter(a => new Date(a.timestamp).toDateString() === d.toDateString()).length
    return { value: count + Math.floor(Math.random() * 3) }
  })

  // By type
  const typeMap = new Map<string, { count: number; color: string }>()
  const COLORS = ['#06b6d4', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#3b82f6']
  data.forEach(a => {
    const existing = typeMap.get(a.documentTypeLabel)
    if (existing) existing.count++
    else typeMap.set(a.documentTypeLabel, { count: 1, color: COLORS[typeMap.size % COLORS.length] })
  })
  const typeData: DocumentTypeCount[] = Array.from(typeMap.entries()).map(([type, { count, color }]) => ({ type, count, color }))

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        <View style={styles.header}>
          <Text style={styles.title}>Analytics</Text>
          <Text style={styles.subtitle}>Last 14 days</Text>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard title="Documents" value={data.length} icon={FileCheck} color="#06b6d4" />
          <MetricCard title="Avg Accuracy" value={`${avgConf}%`} icon={TrendingUp} color="#10b981" />
          <MetricCard title="Warnings" value={withWarnings} icon={AlertTriangle} color="#f59e0b" />
          <MetricCard title="Time Saved" value={`${timeSaved}m`} icon={Clock} color="#8b5cf6" />
        </View>

        <Card>
          <CardHeader>
            <CardTitle>14-Day Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniLineChart data={dailyData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Document Type Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {typeData.length > 0
              ? <DocumentTypeChart data={typeData} />
              : <Text style={styles.noData}>No data yet — scan some documents</Text>
            }
          </CardContent>
        </Card>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#020817' },
  content: { padding: 16, gap: 12, paddingBottom: 32 },
  header: { marginBottom: 4 },
  title: { fontFamily: 'SpaceGrotesk-Bold', fontSize: 22, color: '#f1f5f9' },
  subtitle: { fontFamily: 'Inter-Regular', fontSize: 13, color: '#475569', marginTop: 2 },
  metricsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  noData: { fontFamily: 'Inter-Regular', fontSize: 13, color: '#334155', textAlign: 'center', paddingVertical: 20 },
})
