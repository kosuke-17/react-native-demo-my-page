import Ionicons from '@expo/vector-icons/Ionicons'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { topDesignTokens } from '@/features/top/constants/top-design-tokens'

type ProfileCardControlsProps = {
  currentIndex: number
  totalCards: number
  disabled: boolean
  onPrevious: () => void
  onNext: () => void
}

export function ProfileCardControls({
  currentIndex,
  totalCards,
  disabled,
  onPrevious,
  onNext,
}: ProfileCardControlsProps) {
  if (totalCards <= 1) {
    return null
  }

  const pageLabel = `${currentIndex + 1} / ${totalCards}`

  return (
    <View style={styles.row}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="前のカードへ"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onPrevious}
        style={({ pressed }) => [
          styles.navButton,
          disabled ? styles.navButtonDisabled : null,
          pressed && !disabled ? styles.navButtonPressed : null,
        ]}
      >
        <Ionicons
          name="chevron-back"
          size={24}
          color={topDesignTokens.colors.textPrimary}
          style={disabled ? styles.iconDisabled : undefined}
        />
      </Pressable>

      <Text style={styles.pagination} accessibilityLabel={`カード ${pageLabel}`}>
        {pageLabel}
      </Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="次のカードへ"
        accessibilityState={{ disabled }}
        disabled={disabled}
        onPress={onNext}
        style={({ pressed }) => [
          styles.navButton,
          disabled ? styles.navButtonDisabled : null,
          pressed && !disabled ? styles.navButtonPressed : null,
        ]}
      >
        <Ionicons
          name="chevron-forward"
          size={24}
          color={topDesignTokens.colors.textPrimary}
          style={disabled ? styles.iconDisabled : undefined}
        />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: topDesignTokens.spacing[4],
  },
  navButton: {
    width: topDesignTokens.spacing[10],
    height: topDesignTokens.spacing[10],
    borderRadius: topDesignTokens.radii.full,
    borderWidth: 1,
    borderColor: topDesignTokens.colors.glassBorderWhiteMedium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: topDesignTokens.colors.glassBgLight,
  },
  navButtonPressed: {
    opacity: 0.85,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  iconDisabled: {
    opacity: 0.7,
  },
  pagination: {
    color: topDesignTokens.colors.textSecondary,
    fontSize: topDesignTokens.fontSizes.base,
    fontVariant: ['tabular-nums'],
  },
})
