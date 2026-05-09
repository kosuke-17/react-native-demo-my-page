import { useEffect, useRef, useState } from 'react';

import { topDesignTokens } from '@/features/top/constants/top-design-tokens';

const CHAR_MS = topDesignTokens.motion.typewriterCharMs;

type UseTypewriterOptions = {
  reduceMotion: boolean;
  onTypingChange?: (isTyping: boolean) => void;
};

export function useTypewriter(fullText: string, options: UseTypewriterOptions) {
  const { reduceMotion, onTypingChange } = options;
  const [displayedText, setDisplayedText] = useState('');
  const onTypingChangeRef = useRef(onTypingChange);
  onTypingChangeRef.current = onTypingChange;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const notify = (value: boolean) => {
      onTypingChangeRef.current?.(value);
    };

    if (fullText.length === 0) {
      setDisplayedText('');
      notify(false);
      return;
    }

    if (reduceMotion) {
      setDisplayedText(fullText);
      notify(false);
      return;
    }

    notify(true);
    setDisplayedText('');
    let index = 0;
    intervalRef.current = setInterval(() => {
      index += 1;
      const next = fullText.slice(0, index);
      setDisplayedText(next);
      if (index >= fullText.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        notify(false);
      }
    }, CHAR_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [fullText, reduceMotion]);

  const isTyping = !reduceMotion && fullText.length > 0 && displayedText.length < fullText.length;

  return { displayedText, isTyping };
}
