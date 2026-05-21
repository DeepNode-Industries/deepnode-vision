import { View, Text, StyleSheet } from 'react-native'

type BadgeVariant = 'default' | 'cyan' | 'purple' | 'emerald' | 'amber' | 'red' | 'slate'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  dot?: boolean
}

export function Badge({ children, variant = 'default', dot }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant]]}>
      {dot && <View style={[styles.dot, styles[`dot_${variant}`]]} />}
      <Text style={[styles.text, styles[`text_${variant}`]]}>{children}</Text>
    </View>
  )
}

export function ConfidenceBadge({ confidence }: { confidence: number }) {
  const variant = confidence >= 90 ? 'emerald' : confidence >= 70 ? 'cyan' : confidence >= 50 ? 'amber' : 'red'
  return (
    <Badge variant={variant}>
      {confidence}%
    </Badge>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontFamily: 'Inter-SemiBold',
  },

  default: { backgroundColor: 'rgba(30,41,59,0.8)', borderColor: 'rgba(255,255,255,0.1)' },
  cyan: { backgroundColor: 'rgba(6,182,212,0.12)', borderColor: 'rgba(6,182,212,0.3)' },
  purple: { backgroundColor: 'rgba(139,92,246,0.12)', borderColor: 'rgba(139,92,246,0.3)' },
  emerald: { backgroundColor: 'rgba(16,185,129,0.12)', borderColor: 'rgba(16,185,129,0.3)' },
  amber: { backgroundColor: 'rgba(245,158,11,0.12)', borderColor: 'rgba(245,158,11,0.3)' },
  red: { backgroundColor: 'rgba(239,68,68,0.12)', borderColor: 'rgba(239,68,68,0.3)' },
  slate: { backgroundColor: 'rgba(100,116,139,0.12)', borderColor: 'rgba(100,116,139,0.3)' },

  text_default: { color: '#94a3b8' },
  text_cyan: { color: '#22d3ee' },
  text_purple: { color: '#a78bfa' },
  text_emerald: { color: '#34d399' },
  text_amber: { color: '#fbbf24' },
  text_red: { color: '#f87171' },
  text_slate: { color: '#94a3b8' },

  dot_default: { backgroundColor: '#64748b' },
  dot_cyan: { backgroundColor: '#06b6d4' },
  dot_purple: { backgroundColor: '#8b5cf6' },
  dot_emerald: { backgroundColor: '#10b981' },
  dot_amber: { backgroundColor: '#f59e0b' },
  dot_red: { backgroundColor: '#ef4444' },
  dot_slate: { backgroundColor: '#64748b' },
})
