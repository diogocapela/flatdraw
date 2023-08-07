import svgPathBbox from 'svg-path-bbox';

import type { CanvasObject, ObjectDimensions } from '~/config/types';

const DEFAULT_ICON_WIDTH = 100;

export default function getDimensionsFromSVGIconObject({
  iconObject,
  context,
  initialIconWidth = DEFAULT_ICON_WIDTH,
}: {
  iconObject: Pick<CanvasObject, 'x' | 'y' | 'width' | 'height' | 'svgPath'>;
  context: CanvasRenderingContext2D | null;
  initialIconWidth?: number;
}): ObjectDimensions & {
  initialWidth: number;
  initialHeight: number;
  svgAdjustedX: number;
  svgAdjustedY: number;
  widthRatio: number;
  heightRatio: number;
} {
  if (!context) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      initialWidth: 0,
      initialHeight: 0,
      svgAdjustedX: 0,
      svgAdjustedY: 0,
      widthRatio: 0,
      heightRatio: 0,
    };
  }

  const [svgX, svgY, svgWidth, svgHeight] = svgPathBbox(iconObject.svgPath);

  const widthRatio = iconObject.width / (svgWidth - svgX);
  const heightRatio = iconObject.height / (svgHeight - svgY);

  const svgRealWidth = svgWidth - svgX;
  const svgRealHeight = svgHeight - svgY;

  const initialWidthMin = Math.min(svgRealWidth, initialIconWidth);
  const initialWidth = Math.max(initialWidthMin, initialIconWidth);
  const initialHeight = (initialWidth * svgRealHeight) / svgRealWidth;

  return {
    x: iconObject.x,
    y: iconObject.y,
    width: svgRealWidth,
    height: svgRealHeight,
    initialWidth,
    initialHeight,
    svgAdjustedX: svgX * widthRatio,
    svgAdjustedY: svgY * heightRatio,
    widthRatio,
    heightRatio,
  };
}
