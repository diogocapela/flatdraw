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

  canvas.width = canvasWidth; // * 2;
  canvas.height = canvasHeight; // * 2;

  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  //context.scale(2, 2);
}
