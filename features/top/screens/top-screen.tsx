import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CreditLink } from '@/features/top/components/credit-link';
import { ProfileHero } from '@/features/top/components/profile-hero';
import { TopHeader } from '@/features/top/components/top-header';
import { topDesignTokens } from '@/features/top/constants/top-design-tokens';

export function TopScreen() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={[styles.root, { paddingBottom: tabBarHeight }]}>
        <TopHeader />
        <View style={styles.heroArea}>
          <ProfileHero />
        </View>
        <CreditLink />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: topDesignTokens.colors.backgroundPrimaryDark,
  },
  root: {
    flex: 1,
    backgroundColor: topDesignTokens.colors.backgroundPrimaryDark,
  },
  heroArea: {
    flex: 1,
    justifyContent: 'center',
  },
});
