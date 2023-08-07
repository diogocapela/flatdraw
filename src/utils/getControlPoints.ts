import type { CanvasObject } from '~/config/types';

interface Point {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function getControlPoints({ canvasObject, zoom }: { canvasObject: CanvasObject; zoom: number }): {
  position: Point;
  topLeftBox: Point;
  topCenterBox: Point;
  topRightBox: Point;
  middleLeftBox: Point;
  middleRightBox: Point;
  bottomLeftBox: Point;
  bottomCenterBox: Point;
  bottomRightBox: Point;
} {
  const MAS_SIZE = 20 / (zoom / 100);
  const objectMinSize = Math.min(canvasObject.width, canvasObject.height);
  const SIZE = Math.min(objectMinSize / 4, MAS_SIZE);
  const HALF = SIZE / 2;

  const position = {
    x: canvasObject.x,
    y: canvasObject.y,
    width: canvasObject.width,
    height: canvasObject.height,
  };

  return {
    position,
    topLeftBox: {
      x: position.x - HALF,
      y: position.y - HALF,
      width: SIZE,
      height: SIZE,
    },
    topCenterBox: {
      x: position.x + position.width / 2 - HALF,
      y: position.y - HALF,
      width: SIZE,
      height: SIZE,
    },
    topRightBox: {
      x: position.x + position.width - HALF,
      y: position.y - HALF,
      width: SIZE,
      height: SIZE,
    },
    middleLeftBox: {
      x: position.x - HALF,
      y: position.y + position.height / 2 - HALF,
      width: SIZE,
      height: SIZE,
    },
    middleRightBox: {
      x: position.x + position.width - HALF,
      y: position.y + position.height / 2 - HALF,
      width: SIZE,
      height: SIZE,
    },
    bottomLeftBox: {
      x: position.x - HALF,
      y: position.y + position.height - HALF,
      width: SIZE,
      height: SIZE,
    },
    bottomCenterBox: {
      x: position.x + position.width / 2 - HALF,
      y: position.y + position.height - HALF,
      width: SIZE,
      height: SIZE,
    },
    bottomRightBox: {
      x: position.x + position.width - HALF,
      y: position.y + position.height - HALF,
      width: SIZE,
      height: SIZE,
    },
  };
}
