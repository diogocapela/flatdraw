import { create } from 'zustand';

interface WindowSize {
  width: number;
  height: number;
}

const useWindowSize = create<{
  windowSize: WindowSize;
  setWindowSize: (windowSize: WindowSize) => void;
}>((set) => ({
  windowSize: { width: 0, height: 0 },
  setWindowSize: (windowSize: WindowSize) => set((state) => ({ ...state, windowSize })),
}));

export default useWindowSize;
