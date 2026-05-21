import { View, Text, StyleSheet } from 'react-native'
import Svg, { Rect, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg'
import type { WeeklyDataPoint } from '@/lib/types'

interface UsageChartProps {
  data: WeeklyDataPoint[]
}

export function UsageChart({ data }: UsageChartProps) {
  const W = 300
  const H = 120
  const PAD = { top: 10, bottom: 28, left: 8, right: 8 }
  const plotW = W - PAD.left - PAD.right
  const plotH = H - PAD.top - PAD.bottom

  const maxVal = Math.max(...data.map(d => d.documents), 1)
  const barW = plotW / data.length
  const barPad = 4

  return (
    <View style={styles.container}>
      <Svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`}>
        <Defs>
          <LinearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
            <Stop offset="100%" stopColor="#0891b2" stopOpacity="0.3" />
          </LinearGradient>
        </Defs>
        {data.map((d, i) => {
          const barH = Math.max((d.documents / maxVal) * plotH, 4)
          const x = PAD.left + i * barW + barPad / 2
          const y = PAD.top + plotH - barH
          return (
            <React.Fragment key={d.day}>
              <Rect
                x={x} y={y}
                width={barW - barPad}
                height={barH}
                fill="url(#bar-grad)"
                rx={3}
              />
              <SvgText
                x={x + (barW - barPad) / 2} y={H - 4}
                textAnchor="middle"
                fontSize={9}
                fill="#475569"
                fontFamily="Inter-Regular"
              >
                {d.day}
              </SvgText>
            </React.Fragment>
          )
        })}
      </Svg>
    </View>
  )
}

// Need React import for Fragment
import React from 'react'

const styles = StyleSheet.create({
  container: { width: '100%' },
})
