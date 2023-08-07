export default function isCursorWithinCircle({
  x,
  y,
  r,
  mouseX,
  mouseY,
}: {
  x: number;
  y: number;
  r: number;
  mouseX: number;
  mouseY: number;
}): boolean {
  const distSqr = Math.pow(x - mouseX, 2) + Math.pow(y - mouseY, 2);

  if (distSqr < r * r) {
    return true;
  }

  return false;
}
