import { StyleSheet, useWindowDimensions } from 'react-native'
import Svg, { Line } from 'react-native-svg'

import { topDesignTokens } from '@/features/top/constants/top-design-tokens'

export function GridBackground() {
  const { width, height } = useWindowDimensions()
  const cell = topDesignTokens.sizes.gridCell
  const stroke = topDesignTokens.colors.glassBgLight

  const verticalLines = Math.ceil(width / cell) + 1
  const horizontalLines = Math.ceil(height / cell) + 1

  return (
    <Svg
      pointerEvents="none"
      width={width}
      height={height}
      style={[StyleSheet.absoluteFill, { zIndex: 0 }]}
    >
      {Array.from({ length: verticalLines }, (_, column) => (
        <Line
          key={`v-${column}`}
          x1={column * cell}
          y1={0}
          x2={column * cell}
          y2={height}
          stroke={stroke}
          strokeWidth={1}
        />
      ))}
      {Array.from({ length: horizontalLines }, (_, row) => (
        <Line
          key={`h-${row}`}
          x1={0}
          y1={row * cell}
          x2={width}
          y2={row * cell}
          stroke={stroke}
          strokeWidth={1}
        />
      ))}
    </Svg>
  )
}
