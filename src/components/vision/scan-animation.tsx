import { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing,
} from 'react-native-reanimated'

const { width } = Dimensions.get('window')

export function ScanAnimation({ height = 200 }: { height?: number }) {
  const translateY = useSharedValue(0)
  const opacity = useSharedValue(0.9)

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(height - 2, { duration: 2000, easing: Easing.linear }),
      -1, false
    )
    opacity.value = withRepeat(
      withTiming(0.3, { duration: 1000, easing: Easing.ease }),
      -1, true
    )
  }, [height])

  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }))

  return (
    <View style={[styles.container, { height }]} pointerEvents="none">
      {/* Corner brackets */}
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />

      {/* Scan line */}
      <Animated.View style={[styles.scanLine, lineStyle]} />

      {/* Grid overlay */}
      <View style={styles.gridOverlay} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    left: 0, right: 0,
    height: 2,
    backgroundColor: '#06b6d4',
    shadowColor: '#06b6d4',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.05,
  },
  corner: {
    position: 'absolute',
    width: 20, height: 20,
    borderColor: '#06b6d4',
  },
  topLeft: { top: 8, left: 8, borderTopWidth: 2, borderLeftWidth: 2, borderTopLeftRadius: 4 },
  topRight: { top: 8, right: 8, borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: 4 },
  bottomLeft: { bottom: 8, left: 8, borderBottomWidth: 2, borderLeftWidth: 2, borderBottomLeftRadius: 4 },
  bottomRight: { bottom: 8, right: 8, borderBottomWidth: 2, borderRightWidth: 2, borderBottomRightRadius: 4 },
})
