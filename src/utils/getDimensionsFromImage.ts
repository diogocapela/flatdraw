import type { CanvasObject, ObjectDimensions } from '~/config/types';

export default async function getDimensionsFromImage({
  imageObject,
  context,
}: {
  imageObject: Pick<CanvasObject, 'x' | 'y' | 'imageElement'>;
  context: CanvasRenderingContext2D | null;
}): Promise<ObjectDimensions> {
  if (!context || !imageObject.imageElement) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }

  return {
    x: imageObject.x,
    y: imageObject.y,
    width: imageObject.imageElement.naturalWidth,
    height: imageObject.imageElement.naturalHeight,
  };
}
