import type { CanvasObject, ObjectDimensions } from '~/config/types';
import getPositionFromDrawingPoints from '~/utils/getPositionFromDrawingPoints';

export default function getDimensionsFromFreeDraw({
  freeDrawObject,
}: {
  freeDrawObject: Pick<CanvasObject, 'x' | 'y' | 'freeDrawPoints'>;
}): ObjectDimensions {
  const positionFromDrawingPoints = getPositionFromDrawingPoints({
    freeDrawPoints: freeDrawObject.freeDrawPoints,
  });

  const x = Math.min(...freeDrawObject.freeDrawPoints.map((p) => p.x)) + freeDrawObject.x - positionFromDrawingPoints.x || 0;

  const y = Math.min(...freeDrawObject.freeDrawPoints.map((p) => p.y)) + freeDrawObject.y - positionFromDrawingPoints.y || 0;

  const width =
    Math.max(...freeDrawObject.freeDrawPoints.map((p) => p.x)) - Math.min(...freeDrawObject.freeDrawPoints.map((p) => p.x));

  const height =
    Math.max(...freeDrawObject.freeDrawPoints.map((p) => p.y)) - Math.min(...freeDrawObject.freeDrawPoints.map((p) => p.y));

  return {
    x,
    y,
    width,
    height,
  };
}
