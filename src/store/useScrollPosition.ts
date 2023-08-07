import { create } from 'zustand';

import type { ScrollPosition } from '~/config/types';

interface ScrollPositionDelta {
  deltaX: number;
  deltaY: number;
}

const useScrollPosition = create<{
  scrollPosition: ScrollPosition;
  setScrollPosition: (scrollPosition: ScrollPosition) => void;
  updateScrollPosition: (delta: ScrollPositionDelta) => void;
}>((set) => ({
  scrollPosition: { x: 0, y: 0 },
  setScrollPosition: (scrollPosition: ScrollPosition) => set(() => ({ scrollPosition })),
  updateScrollPosition: (delta: ScrollPositionDelta) =>
    set((state) => ({
      scrollPosition: {
        x: state.scrollPosition.x + delta.deltaX,
        y: state.scrollPosition.y + delta.deltaY,
      },
    })),
}));

export default useScrollPosition;
