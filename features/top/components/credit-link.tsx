import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { creditContent } from '@/features/top/constants/top-content'
import { topDesignTokens } from '@/features/top/constants/top-design-tokens'

export function CreditLink() {
  const insets = useSafeAreaInsets()

  return (
    <View
      pointerEvents="none"
      style={[
        styles.wrapper,
        {
          right: topDesignTokens.layout.horizontalPadding,
          bottom: topDesignTokens.spacing[4] + insets.bottom,
        },
      ]}
    >
      <Text style={styles.text} accessibilityRole="text">
        {creditContent.label}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    zIndex: 50,
    maxWidth: '70%',
  },
  text: {
    color: topDesignTokens.colors.gray400,
    fontSize: topDesignTokens.fontSizes.xs,
    lineHeight: topDesignTokens.fontSizes.xs * topDesignTokens.lineHeights.relaxedMultiplier,
  },
})
