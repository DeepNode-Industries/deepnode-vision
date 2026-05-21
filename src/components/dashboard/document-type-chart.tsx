import { View, Text, StyleSheet } from 'react-native'
import Svg, { Path, Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import type { DocumentTypeCount } from '@/lib/types'

interface DocTypeChartProps {
  data: DocumentTypeCount[]
}

function polarToXY(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle - Math.PI / 2),
    y: cy + r * Math.sin(angle - Math.PI / 2),
  }
}

function arcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToXY(cx, cy, r, startAngle)
  const end = polarToXY(cx, cy, r, endAngle)
  const large = endAngle - startAngle > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y} Z`
}

export function DocumentTypeChart({ data }: DocTypeChartProps) {
  const total = data.reduce((s, d) => s + d.count, 0) || 1
  const cx = 70, cy = 70, r = 55, innerR = 32
  let angle = 0

  const segments = data.map(d => {
    const slice = (d.count / total) * 2 * Math.PI
    const path = arcPath(cx, cy, r, angle, angle + slice)
    angle += slice
    return { ...d, path }
  })

  return (
    <View style={styles.row}>
      <Svg width={140} height={140}>
        {segments.map((s, i) => (
          <Path key={i} d={s.path} fill={s.color} opacity={0.85} />
        ))}
        {/* Donut hole */}
        <Circle cx={cx} cy={cy} r={innerR} fill="#0a0f1e" />
        <Circle cx={cx} cy={cy} r={innerR - 1} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
        <Text>
        </Text>
      </Svg>
      <View style={styles.legend}>
        {data.slice(0, 5).map((d, i) => (
          <View key={i} style={styles.legendRow}>
            <View style={[styles.dot, { backgroundColor: d.color }]} />
            <Text style={styles.legendLabel} numberOfLines={1}>{d.type}</Text>
            <Text style={[styles.legendCount, { color: d.color }]}>{d.count}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  legend: { flex: 1, gap: 6 },
  legendRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  dot: { width: 7, height: 7, borderRadius: 4 },
  legendLabel: { flex: 1, fontSize: 11, fontFamily: 'Inter-Regular', color: '#94a3b8' },
  legendCount: { fontSize: 12, fontFamily: 'Inter-SemiBold' },
})
