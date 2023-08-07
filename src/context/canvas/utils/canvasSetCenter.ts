import type { CanvasWorkingSize } from '~/config/types';
import theme from '~/theme';

export default function canvasSetCenter({
  canvas,
  context,
  canvasWorkingSize,
  setScrollPosition,
  setZoom,
}: {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  canvasWorkingSize: CanvasWorkingSize;
  setScrollPosition: (scrollPosition: { x: number; y: number }) => void;
  setZoom: (zoom: number) => void;
}) {
  if (!canvas || !context) return;

  const widthOverflow = canvasWorkingSize.width - window.innerWidth;
  const heightOverflow = canvasWorkingSize.height - window.innerHeight;

  const maxOverflow = Math.max(widthOverflow, heightOverflow);

  const hasOverflow = maxOverflow > 0;

  const gteMd = window.innerWidth > theme.medias.md;

  const gutter = {
    top: gteMd ? 40 : 15,
    bottom: gteMd ? 200 : 190,
    horizontal: gteMd ? 200 : 24,
  };

  const newZoom =
    widthOverflow === maxOverflow
      ? ((window.innerWidth - gutter.horizontal * 2) / canvasWorkingSize.width) * 100
      : ((window.innerHeight - gutter.top - gutter.bottom) / canvasWorkingSize.height) * 100;

  setZoom(hasOverflow ? newZoom : 100);

  const scrollPositionX = (window.innerWidth - canvasWorkingSize.width) / 2;
  const scrollPositionY = (window.innerHeight - canvasWorkingSize.height) / 2;

  setScrollPosition({
    x: scrollPositionX,
    y: scrollPositionY + gutter.top,
  });
}
