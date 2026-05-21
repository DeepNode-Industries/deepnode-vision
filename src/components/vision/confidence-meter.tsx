import { View, Text, StyleSheet } from 'react-native'
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg'
import Animated, { useSharedValue, useAnimatedProps, withTiming, Easing } from 'react-native-reanimated'
import { useEffect } from 'react'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

interface ConfidenceMeterProps {
  confidence: number
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = {
  sm: { dim: 56, stroke: 4, r: 22, font: 13 },
  md: { dim: 80, stroke: 5, r: 32, font: 18 },
  lg: { dim: 112, stroke: 6, r: 46, font: 24 },
}

export function ConfidenceMeter({ confidence, size = 'md' }: ConfidenceMeterProps) {
  const { dim, stroke, r, font } = SIZES[size]
  const cx = dim / 2
  const circumference = 2 * Math.PI * r
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = withTiming(confidence / 100, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    })
  }, [confidence])

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - progress.value),
  }))

  const color = confidence >= 90 ? '#10b981' : confidence >= 70 ? '#06b6d4' : confidence >= 50 ? '#f59e0b' : '#ef4444'

  return (
    <View style={{ width: dim, height: dim, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={dim} height={dim} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <Stop offset="100%" stopColor={color} />
          </LinearGradient>
        </Defs>
        {/* Track */}
        <Circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        {/* Progress */}
        <AnimatedCircle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          transform={`rotate(-90 ${cx} ${cx})`}
        />
      </Svg>
      <Text style={[styles.value, { fontSize: font, color }]}>{confidence}</Text>
      <Text style={styles.pct}>%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  value: { fontFamily: 'SpaceGrotesk-Bold', lineHeight: 22 },
  pct: { fontFamily: 'Inter-Medium', fontSize: 9, color: '#64748b', marginTop: -2 },
})
