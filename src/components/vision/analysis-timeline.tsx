import { View, Text, StyleSheet } from 'react-native'
import { CheckCircle2, Circle, Loader, XCircle } from 'lucide-react-native'
import Animated, { useSharedValue, withRepeat, withTiming, useAnimatedStyle } from 'react-native-reanimated'
import { useEffect } from 'react'
import type { TimelineStep } from '@/lib/types'

function PulsingLoader() {
  const opacity = useSharedValue(1)
  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.3, { duration: 700 }), -1, true)
  }, [])
  const style = useAnimatedStyle(() => ({ opacity: opacity.value }))
  return (
    <Animated.View style={style}>
      <Loader size={16} color="#06b6d4" />
    </Animated.View>
  )
}

export function AnalysisTimeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <View style={styles.container}>
      {steps.map((step, i) => (
        <View key={step.id} style={styles.row}>
          <View style={styles.iconCol}>
            {step.status === 'complete' && <CheckCircle2 size={16} color="#10b981" />}
            {step.status === 'running' && <PulsingLoader />}
            {step.status === 'pending' && <Circle size={16} color="#334155" />}
            {step.status === 'error' && <XCircle size={16} color="#ef4444" />}
            {i < steps.length - 1 && (
              <View style={[styles.line, step.status === 'complete' && styles.lineComplete]} />
            )}
          </View>
          <View style={styles.info}>
            <Text style={[
              styles.label,
              step.status === 'complete' && styles.labelComplete,
              step.status === 'running' && styles.labelRunning,
              step.status === 'error' && styles.labelError,
            ]}>
              {step.label}
            </Text>
            {step.duration && (
              <Text style={styles.duration}>{step.duration}ms</Text>
            )}
            {step.status === 'running' && (
              <Text style={styles.running}>Processing…</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 0 },
  row: { flexDirection: 'row', gap: 12, minHeight: 40 },
  iconCol: { alignItems: 'center', width: 20 },
  line: {
    flex: 1,
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginTop: 4,
    minHeight: 16,
  },
  lineComplete: { backgroundColor: 'rgba(16,185,129,0.4)' },
  info: { flex: 1, paddingBottom: 12 },
  label: { fontFamily: 'Inter-Medium', fontSize: 13, color: '#475569' },
  labelComplete: { color: '#e2e8f0' },
  labelRunning: { color: '#22d3ee' },
  labelError: { color: '#f87171' },
  duration: { fontSize: 11, color: '#334155', fontFamily: 'Inter-Regular', marginTop: 2 },
  running: { fontSize: 11, color: '#0891b2', fontFamily: 'Inter-Regular', marginTop: 2 },
})
