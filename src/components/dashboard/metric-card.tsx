import { View, Text, StyleSheet } from 'react-native'
import type { LucideIcon } from 'lucide-react-native'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  color?: string
  trend?: number
}

export function MetricCard({ title, value, subtitle, icon: Icon, color = '#06b6d4', trend }: MetricCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.iconWrap, { borderColor: `${color}40`, backgroundColor: `${color}15` }]}>
          <Icon size={14} color={color} />
        </View>
      </View>
      <Text style={[styles.value, { color }]}>{value}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {trend !== undefined && (
        <Text style={[styles.trend, { color: trend >= 0 ? '#10b981' : '#ef4444' }]}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}% this week
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: 'rgba(15,23,42,0.8)',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    gap: 4,
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  title: { fontSize: 11, fontFamily: 'Inter-Medium', color: '#475569', textTransform: 'uppercase', letterSpacing: 0.6 },
  iconWrap: { width: 26, height: 26, borderRadius: 7, alignItems: 'center', justifyContent: 'center', borderWidth: 1 },
  value: { fontSize: 26, fontFamily: 'SpaceGrotesk-Bold', lineHeight: 30 },
  subtitle: { fontSize: 11, fontFamily: 'Inter-Regular', color: '#475569' },
  trend: { fontSize: 11, fontFamily: 'Inter-Medium', marginTop: 2 },
})
