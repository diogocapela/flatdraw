import { CANVAS_CONTROLS_OVERLAY } from '~/config/globalElementIds';
import type { ActionMode, CanvasObject, CanvasWorkingSize, ScrollPosition } from '~/config/types';
import getControlPoints from '~/utils/getControlPoints';
import renderEllipse from '~/utils/render/renderEllipse';
import renderFreeDrawing from '~/utils/render/renderFreeDrawing';
import renderImage from '~/utils/render/renderImage';
import renderRectangle from '~/utils/render/renderRectangle';
import renderSVGIcon from '~/utils/render/renderSVGIcon';
import renderText from '~/utils/render/renderText';

export default function canvasDrawEverything({
  canvas,
  context,
  canvasWorkingSize,
  canvasBackgroundColor,
  canvasObjects,
  activeObjectId,
  actionMode,
  zoom,
  scrollPosition,
  windowSize,
}: {
  canvas: HTMLCanvasElement | null;
  context: CanvasRenderingContext2D | null;
  canvasWorkingSize: CanvasWorkingSize;
  canvasBackgroundColor: string;
  canvasObjects: CanvasObject[];
  activeObjectId: string | null;
  actionMode: ActionMode;
  zoom: number;
  scrollPosition: ScrollPosition;
  windowSize: { width: number; height: number };
}) {
  if (!canvas || !context) return;

  // Draw background
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = canvasBackgroundColor;
  context.fillRect(0, 0, canvasWorkingSize.width, canvasWorkingSize.height);

  // Draw objects
  canvasObjects.forEach((object) => {
    switch (object.type) {
      case 'rectangle': {
        renderRectangle({ context, ...object });
        break;
      }
      case 'ellipse': {
        renderEllipse({ context, ...object });
        break;
      }
      case 'free-draw': {
        renderFreeDrawing({ context, ...object });
        break;
      }
      case 'text': {
        renderText({ context, ...object });
        break;
      }
      case 'icon': {
        renderSVGIcon({ context, ...object });
        break;
      }
      case 'image': {
        renderImage({ context, ...object });
        break;
      }
      default:
        break;
    }
  });

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  const overlayContext = (document.getElementById(CANVAS_CONTROLS_OVERLAY) as HTMLCanvasElement)?.getContext('2d');

  if (overlayContext) {
    overlayContext.clearRect(0, 0, windowSize.width, windowSize.height);

    if (activeObject && actionMode?.type !== 'isDrawing') {
      const zoomRatio = zoom / 100;

      // We adjust here and then multiply by zoomRatio to make the controls go outside the canvas
      const positionAdjustment = {
        x: scrollPosition.x + (canvasWorkingSize.width - canvasWorkingSize.width * zoomRatio) / 2,
        y: scrollPosition.y + (canvasWorkingSize.height - canvasWorkingSize.height * zoomRatio) / 2,
      };

      // Draw controls
      const {
        position,
        topLeftBox,
        topCenterBox,
        topRightBox,
        middleLeftBox,
        middleRightBox,
        bottomLeftBox,
        bottomCenterBox,
        bottomRightBox,
      } = getControlPoints({
        canvasObject: activeObject,
        zoom,
      });

      overlayContext.lineWidth = 2;
      overlayContext.strokeStyle = '#ff0000'; // red
      overlayContext.strokeRect(
        position.x * zoomRatio + positionAdjustment.x,
        position.y * zoomRatio + positionAdjustment.y,
        position.width * zoomRatio,
        position.height * zoomRatio
      );
      overlayContext.setLineDash([0, 0]);
      overlayContext.fillStyle = '#ff0000';

      [
        topLeftBox,
        topCenterBox,
        topRightBox,
        middleLeftBox,
        middleRightBox,
        bottomLeftBox,
        bottomCenterBox,
        bottomRightBox,
      ].forEach((box) => {
        overlayContext.fillRect(
          box.x * zoomRatio + positionAdjustment.x,
          box.y * zoomRatio + positionAdjustment.y,
          box.width * zoomRatio,
          box.height * zoomRatio
        );
      });
    }
  }
}
