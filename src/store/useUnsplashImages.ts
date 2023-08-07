import { create } from 'zustand';

import type { UnsplashImage } from '~/config/types';

const useUnsplashImages = create<{
  unsplashImagesMap: Record<string, UnsplashImage>;
  setUnsplashImages: (unsplashImages: UnsplashImage[]) => Promise<void>;
}>((set) => ({
  unsplashImagesMap: {},
  setUnsplashImages: async (unsplashImages: UnsplashImage[]) => {
    return set((state) => ({
      unsplashImagesMap: {
        ...state.unsplashImagesMap,
        ...unsplashImages.reduce(
          (acc, cur) => ({
            ...acc,
            [cur.id]: cur,
          }),
          state.unsplashImagesMap
        ),
      },
    }));
  },
}));

export default useUnsplashImages;
