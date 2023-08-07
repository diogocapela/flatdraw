import svgpath from 'svgpath';

import type { IconObject } from '~/config/types';
import hexToRgba from '~/utils/hexToRgba';

import getDimensionsFromSVGIconObject from './getDimensionsFromSVGIconObject';

export default function renderSVGIcon({
  context,
  x,
  y,
  width,
  height,
  backgroundColorHex,
  opacity,
  svgPath,
}: {
  context: CanvasRenderingContext2D;
} & Omit<IconObject, 'type'>): void {
  context.fillStyle = hexToRgba({ hex: backgroundColorHex, opacity });

  const dimensions = getDimensionsFromSVGIconObject({ context, iconObject: { x, y, width, height, svgPath } });

  const transformed = svgpath(svgPath)
    .rel()
    .scale(dimensions.widthRatio, dimensions.heightRatio)
    .translate(x - dimensions.svgAdjustedX, y - dimensions.svgAdjustedY)
    .toString();

  context.beginPath();

  const path2d = new Path2D(transformed);

  context.fill(path2d);

  context.closePath();
}
