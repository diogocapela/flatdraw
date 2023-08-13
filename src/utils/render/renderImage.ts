import type { ImageObject } from '~/config/types';

export default function renderImage({
  context,
  x,
  y,
  width,
  height,
  opacity,
  imageElement,
}: {
  context: CanvasRenderingContext2D;
} & Omit<ImageObject, 'type'>): void {
  context.globalAlpha = opacity / 100;

  if (imageElement) {
    context.drawImage(imageElement, x, y, width, height);
  }

  context.globalAlpha = 1;
}
