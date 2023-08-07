import type { UnsplashImage } from '~/config/types';

export default async function fetchUnsplashImages({ query, page }: { query: string; page: number }): Promise<UnsplashImage[]> {
  const response = await fetch(`/api/fetchUnsplashImages?query=${query}&page=${page}`);
  const result = await response.json();
  const unsplashImages: UnsplashImage[] = result?.images || [];
  return unsplashImages;
}
