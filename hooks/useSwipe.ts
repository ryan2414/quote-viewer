import { useRef } from 'react';
import type React from 'react';

interface UseSwipeOptions {
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  threshold?: number;
}

interface SwipeHandlers {
  onTouchStart: React.TouchEventHandler<HTMLDivElement>;
  onTouchEnd: React.TouchEventHandler<HTMLDivElement>;
}

export function useSwipe({ onSwipeLeft, onSwipeRight, threshold = 50 }: UseSwipeOptions): SwipeHandlers {
  const startX = useRef<number>(0);

  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > threshold) onSwipeLeft();
    else if (diff < -threshold) onSwipeRight();
  };

  return { onTouchStart, onTouchEnd };
}
