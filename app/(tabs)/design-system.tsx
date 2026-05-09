import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { TopHeader } from '@/features/top/components/top-header'
import { topDesignTokens } from '@/features/top/constants/top-design-tokens'

export default function DesignSystemScreen() {
  const tabBarHeight = useBottomTabBarHeight()

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={[styles.root, { paddingBottom: tabBarHeight }]}>
        <TopHeader />
        <View style={styles.content}>
          <Text style={styles.todo}>TODO</Text>
        </View>
      </View>
    </SafeAreaView>
  )
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todo: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.4)',
  },
})
