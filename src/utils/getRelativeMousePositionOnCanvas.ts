import type { CanvasWorkingSize, ScrollPosition } from '~/config/types';

export default function getRelativeMousePositionOnCanvas({
  windowMouseX,
  windowMouseY,
  canvasWorkingSize,
  scrollPosition,
  zoom,
}: {
  windowMouseX: number;
  windowMouseY: number;
  canvasWorkingSize: CanvasWorkingSize;
  scrollPosition: ScrollPosition;
  zoom: number;
}): {
  relativeMouseX: number;
  relativeMouseY: number;
} {
  const zoomRatio = zoom / 100;

  const canvasNewWidth = canvasWorkingSize.width * zoomRatio;
  const canvasNewHeight = canvasWorkingSize.height * zoomRatio;

  const gutterX = (canvasWorkingSize.width - canvasNewWidth) / 2;
  const gutterY = (canvasWorkingSize.height - canvasNewHeight) / 2;

  const relativeMouseX = (windowMouseX - scrollPosition.x - gutterX) / zoomRatio;
  const relativeMouseY = (windowMouseY - scrollPosition.y - gutterY) / zoomRatio;

  return {
    relativeMouseX,
    relativeMouseY,
  };
}
