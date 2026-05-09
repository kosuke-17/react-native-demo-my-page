import { useCallback, useState } from 'react'
import { Image, Platform, StyleSheet, useWindowDimensions, View } from 'react-native'

import { ProfileCardControls } from '@/features/top/components/profile-card-controls'
import { ProfileCardText } from '@/features/top/components/profile-card-text'
import { profileCards, profileImageSource } from '@/features/top/constants/top-content'
import { topDesignTokens } from '@/features/top/constants/top-design-tokens'
import { useProfileCard } from '@/features/top/hooks/use-profile-card'
import { useReducedMotion } from '@/features/top/hooks/use-reduced-motion'

const totalCards = profileCards.length

export function ProfileHero() {
  const { width } = useWindowDimensions()
  const reduceMotion = useReducedMotion()
  const { currentIndex, goNext, goPrevious } = useProfileCard(totalCards)
  const [isTyping, setIsTyping] = useState(false)

  const handleTypingChange = useCallback((next: boolean) => {
    setIsTyping(next)
  }, [])

  const profileImageSize =
    width >= topDesignTokens.layout.profileBreakpointWidth
      ? topDesignTokens.sizes.profileImageLg
      : topDesignTokens.sizes.profileImageSm

  const cardWidth = Math.min(width - topDesignTokens.layout.horizontalPadding * 2, topDesignTokens.sizes.profileCardMaxWidth)

  const currentCard = profileCards[currentIndex]
  const borderRadius = profileImageSize / 2

  return (
    <View style={styles.hero}>
      <Image
        accessibilityLabel="プロフィール写真"
        accessibilityRole="image"
        source={profileImageSource}
        style={[
          styles.profileImage,
          {
            width: profileImageSize,
            height: profileImageSize,
            borderRadius,
          },
        ]}
        resizeMode="cover"
      />

      <View
        style={[
          styles.card,
          {
            width: cardWidth,
            minHeight: topDesignTokens.sizes.profileCardMinHeight,
          },
          Platform.OS === 'ios' ? topDesignTokens.shadows.iosGlassMedium : null,
          Platform.OS === 'android' ? topDesignTokens.shadows.androidGlassMedium : null,
        ]}
      >
        <ProfileCardText
          fullText={currentCard.catchCopy}
          reduceMotion={reduceMotion}
          onTypingChange={handleTypingChange}
        />
        <ProfileCardControls
          currentIndex={currentIndex}
          totalCards={totalCards}
          disabled={isTyping}
          onPrevious={goPrevious}
          onNext={goNext}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: topDesignTokens.layout.heroGap,
    paddingHorizontal: topDesignTokens.layout.horizontalPadding,
    zIndex: 30,
  },
  profileImage: {
    borderWidth: topDesignTokens.layout.profileImageBorderWidth,
    borderColor: topDesignTokens.colors.glassBorderWhiteLight,
  },
  card: {
    borderRadius: topDesignTokens.radii.xl,
    borderWidth: 1,
    borderColor: topDesignTokens.colors.glassBorderWhiteMedium,
    backgroundColor: topDesignTokens.colors.glassBgMedium,
    paddingHorizontal: topDesignTokens.spacing[6],
    paddingVertical: topDesignTokens.spacing[4],
  },
})
