import type { FreeDrawObject } from '~/config/types';
import getPositionFromDrawingPoints from '~/utils/getPositionFromDrawingPoints';
import hexToRgba from '~/utils/hexToRgba';


export default function renderFreeDrawing({
  context,
  x,
  y,
  strokeColorHex,
  strokeWidth,
  opacity,
  freeDrawPoints,
}: {
  context: CanvasRenderingContext2D;
} & Omit<FreeDrawObject, 'type'>): void {
  context.strokeStyle = hexToRgba({ hex: strokeColorHex, opacity });

  context.lineCap = 'round';
  context.lineWidth = strokeWidth || 1;
  context.beginPath();

  const positionFromDrawingPoints = getPositionFromDrawingPoints({
    freeDrawPoints,
  });

  freeDrawPoints.forEach((point, index) => {
    const realX = x - positionFromDrawingPoints.x + point.x;
    const realY = y - positionFromDrawingPoints.y + point.y;
    if (index === 0) {
      context.moveTo(realX, realY);
    } else {
      context.lineTo(realX, realY);
    }
  });
  context.stroke();
  context.closePath();
}
