import type { EllipseObject } from '~/config/types';
import hexToRgba from '~/utils/hexToRgba';

export default function renderEllipse({
  context,
  x,
  y,
  width,
  height,
  backgroundColorHex,
  strokeColorHex,
  strokeWidth,
  opacity,
}: {
  context: CanvasRenderingContext2D;
} & Omit<EllipseObject, 'type'>): void {
  context.save();
  context.fillStyle = hexToRgba({ hex: backgroundColorHex, opacity });
  context.strokeStyle = hexToRgba({ hex: strokeColorHex, opacity: strokeWidth ? opacity : 0 });
  context.lineWidth = strokeWidth;
  context.beginPath();

  context.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, 2 * Math.PI);
  context.fill();
  context.stroke();
  context.restore();
}
