import { useCallback, useState } from 'react'

export function useProfileCard(totalCards: number) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goNext = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % totalCards)
  }, [totalCards])

  const goPrevious = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + totalCards) % totalCards)
  }, [totalCards])

  return { currentIndex, goNext, goPrevious }
}
