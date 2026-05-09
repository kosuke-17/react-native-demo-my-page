import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';

import { headerContent } from '@/features/top/constants/top-content';
import { topDesignTokens } from '@/features/top/constants/top-design-tokens';

const accent = topDesignTokens.colors.accentLight;
const gray50 = topDesignTokens.colors.gray50;

export function TopHeader() {
  return (
    <View style={styles.row} accessibilityRole="header">
      <View
        style={styles.logo}
        accessibilityLabel="サイトロゴ"
        accessible
        accessibilityRole="image"
      >
        <LinearGradient
          colors={[accent, accent, gray50]}
          locations={[0, 0.7, 1]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.logoGradient}
        >
          <View style={[styles.logoInner, { backgroundColor: gray50, opacity: 0.35 }]} />
        </LinearGradient>
      </View>
      <Text style={styles.title}>{headerContent.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    zIndex: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: topDesignTokens.spacing[3],
    paddingHorizontal: topDesignTokens.layout.horizontalPadding,
    paddingVertical: topDesignTokens.spacing[4],
  },
  logo: {
    width: topDesignTokens.sizes.headerLogo,
    height: topDesignTokens.sizes.headerLogo,
  },
  logoGradient: {
    flex: 1,
    borderRadius: topDesignTokens.radii.full,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoInner: {
    width: topDesignTokens.spacing[4],
    height: topDesignTokens.spacing[4],
    borderRadius: topDesignTokens.radii.full,
  },
  title: {
    flex: 1,
    color: topDesignTokens.colors.textPrimary,
    fontSize: topDesignTokens.fontSizes.lg,
    fontWeight: topDesignTokens.fontWeights.semibold,
  },
});
