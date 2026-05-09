import { AccessibilityInfo } from 'react-native'
import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    let mounted = true
    AccessibilityInfo.isReduceMotionEnabled().then((enabled) => {
      if (mounted) setReduceMotion(enabled)
    })

    const subscription = AccessibilityInfo.addEventListener('reduceMotionChanged', (enabled) => {
      setReduceMotion(enabled)
    })

    return () => {
      mounted = false
      subscription.remove()
    }
  }, [])

  return reduceMotion
}
