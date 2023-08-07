import { create } from 'zustand';

const DEFAULT_ZOOM = 100;

const MIN_ZOOM = 10;
const MAX_ZOOM = 200;

const useZoom = create<{
  zoom: number;
  resetZoom: () => void;
  setZoom: (zoom: number) => void;
  decrementZoom: (zoom: number) => void;
  incrementZoom: (zoom: number) => void;
}>((set) => ({
  zoom: DEFAULT_ZOOM,
  resetZoom: () => set(() => ({ zoom: DEFAULT_ZOOM })),
  setZoom: (zoom: number) => set(() => ({ zoom })),
  decrementZoom: (zoom: number) =>
    set((state) => {
      const newZoom = state.zoom - zoom;
      if (newZoom < MIN_ZOOM) {
        return { zoom: MIN_ZOOM };
      }
      return { zoom: newZoom };
    }),
  incrementZoom: (zoom: number) =>
    set((state) => {
      const newZoom = state.zoom + zoom;
      if (newZoom > MAX_ZOOM) {
        return { zoom: MAX_ZOOM };
      }
      return { zoom: newZoom };
    }),
}));

export default useZoom;
