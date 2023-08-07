import { create } from 'zustand';

const useAvailableFonts = create<{
  availableFonts: string[];
  setAvailableFonts: (availableFonts: string[]) => void;
}>((set) => ({
  availableFonts: [],
  setAvailableFonts: (availableFonts: string[]) => set(() => ({ availableFonts })),
}));

export default useAvailableFonts;
