import canvasTxt from 'canvas-txt';

import type { TextObject } from '~/config/types';
import hexToRgba from '~/utils/hexToRgba';

export default function renderText({
  context,
  x,
  y,
  width,
  height,
  opacity,
  text,
  textJustify,
  textAlignHorizontal,
  textAlignVertical,
  fontColorHex,
  fontSize,
  fontFamily,
  fontStyle,
  fontVariant,
  fontWeight,
  fontLineHeightRatio,
}: {
  context: CanvasRenderingContext2D;
} & Omit<TextObject, 'type'>): void {
  context.beginPath();
  context.fillStyle = hexToRgba({ hex: fontColorHex, opacity });

  canvasTxt.debug = false;

  canvasTxt.justify = textJustify;
  canvasTxt.align = textAlignHorizontal;
  canvasTxt.vAlign = textAlignVertical;
  canvasTxt.fontSize = fontSize;
  canvasTxt.font = fontFamily;
  canvasTxt.fontStyle = fontStyle;
  canvasTxt.fontVariant = fontVariant;
  canvasTxt.fontWeight = fontWeight;
  canvasTxt.lineHeight = fontLineHeightRatio * fontSize;

  canvasTxt.drawText(context, text, x, y, width, height);

  context.closePath();
}
