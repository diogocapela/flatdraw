import type { UnsplashImage } from '~/config/types';

export default async function fetchImages({ query, page }: { query: string; page: number }): Promise<UnsplashImage[]> {
  const functionsEndpoint = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:3001' : '';
  const response = await fetch(`${functionsEndpoint}/fetch-images?query=${query}&page=${page}`);
  const result = await response.json();
  const images: UnsplashImage[] = result?.images || [];
  return images;
}
