import type { RectangleObject } from '~/config/types';
import hexToRgba from '~/utils/hexToRgba';

export default function renderRectangle({
  context,
  x,
  y,
  width,
  height,
  backgroundColorHex,
  strokeColorHex,
  strokeWidth,
  opacity,
  borderRadius,
}: {
  context: CanvasRenderingContext2D;
} & Omit<RectangleObject, 'type'>): void {
  context.fillStyle = hexToRgba({ hex: backgroundColorHex, opacity });
  context.strokeStyle = hexToRgba({ hex: strokeColorHex, opacity });

  const halfStrokeWidth = strokeWidth / 2;
  const adjustedX = x + halfStrokeWidth;
  const adjustedY = y + halfStrokeWidth;
  const adjustedWidth = Math.max(0, width - strokeWidth);
  const adjustedHeight = Math.max(0, height - strokeWidth);
  const radius = Math.min(adjustedWidth / 2, adjustedHeight / 2, borderRadius);

  if (radius === 0) {
    context.fillRect(x, y, width, height);
    context.beginPath();
    if (halfStrokeWidth) {
      context.lineWidth = halfStrokeWidth;
      context.strokeRect(x + halfStrokeWidth / 2, y + halfStrokeWidth / 2, width - halfStrokeWidth, height - halfStrokeWidth);
    }
  } else {
    context.beginPath();
    context.lineWidth = strokeWidth;
    context.moveTo(adjustedX + radius, adjustedY);
    context.lineTo(adjustedX + adjustedWidth - radius, adjustedY);
    context.quadraticCurveTo(adjustedX + adjustedWidth, adjustedY, adjustedX + adjustedWidth, adjustedY + radius);
    context.lineTo(adjustedX + adjustedWidth, adjustedY + adjustedHeight - radius);
    context.quadraticCurveTo(
      adjustedX + adjustedWidth,
      adjustedY + adjustedHeight,
      adjustedX + adjustedWidth - radius,
      adjustedY + adjustedHeight
    );
    context.lineTo(adjustedX + radius, adjustedY + adjustedHeight);
    context.quadraticCurveTo(adjustedX, adjustedY + adjustedHeight, adjustedX, adjustedY + adjustedHeight - radius);
    context.lineTo(adjustedX, adjustedY + radius);
    context.quadraticCurveTo(adjustedX, adjustedY, adjustedX + radius, adjustedY);
    if (strokeWidth > 0) {
      context.stroke();
    }
    context.fill();
    context.closePath();
  }
}
