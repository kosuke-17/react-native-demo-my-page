import { useEffect, useRef } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'

import { topDesignTokens } from '@/features/top/constants/top-design-tokens'
import { useTypewriter } from '@/features/top/hooks/use-typewriter'

type ProfileCardTextProps = {
  fullText: string
  reduceMotion: boolean
  onTypingChange?: (isTyping: boolean) => void
}

export function ProfileCardText({ fullText, reduceMotion, onTypingChange }: ProfileCardTextProps) {
  const { displayedText, isTyping } = useTypewriter(fullText, { reduceMotion, onTypingChange })
  const cursorOpacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (!isTyping) {
      cursorOpacity.setValue(0)
      return
    }

    cursorOpacity.setValue(1)
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0.25,
          duration: topDesignTokens.motion.cursorBlinkHalfMs,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: topDesignTokens.motion.cursorBlinkHalfMs,
          useNativeDriver: true,
        }),
      ]),
    )
    loop.start()
    return () => loop.stop()
  }, [cursorOpacity, isTyping])

  return (
    <View style={styles.container}>
      <View style={styles.line} accessibilityRole="text" accessibilityLabel={fullText.length > 0 ? fullText : 'プロフィール本文'}>
        <Text style={styles.text}>{displayedText}</Text>
        {isTyping ? (
          <Animated.Text style={[styles.cursor, { opacity: cursorOpacity }]} accessibilityElementsHidden importantForAccessibility="no">
            |
          </Animated.Text>
        ) : null}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: topDesignTokens.sizes.profileCardMinHeight - topDesignTokens.spacing[6] * 2,
  },
  line: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
  },
  text: {
    color: topDesignTokens.colors.textPrimary,
    fontSize: topDesignTokens.fontSizes.base,
    fontWeight: topDesignTokens.fontWeights.medium,
    lineHeight: topDesignTokens.fontSizes.base * topDesignTokens.lineHeights.relaxedMultiplier,
  },
  cursor: {
    color: topDesignTokens.colors.textPrimary,
    fontSize: topDesignTokens.fontSizes.base,
    fontWeight: topDesignTokens.fontWeights.medium,
    lineHeight: topDesignTokens.fontSizes.base * topDesignTokens.lineHeights.relaxedMultiplier,
  },
})
