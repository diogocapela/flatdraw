export default function canvasInit({
  canvas,
  context,
  canvasWidth,
  canvasHeight,
}: {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  canvasWidth: number;
  canvasHeight: number;
}) {
  if (!canvas || !context) return;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;
}
