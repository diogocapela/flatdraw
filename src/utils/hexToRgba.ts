export default function hexToRgba({ hex, opacity = 100 }: { hex: string; opacity?: number }): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  const r = result?.[1] ? parseInt(result[1], 16) : undefined;
  const g = result?.[2] ? parseInt(result[2], 16) : undefined;
  const b = result?.[3] ? parseInt(result[3], 16) : undefined;

  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}
