import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';

import { TRANSPARENT_BACKGROUND_IMAGE } from '~/config/constants';
import { CANVAS_PREVIEW_UNIQUE_ID } from '~/config/globalElementIds';
import canvasDrawEverything from '~/context/canvas/utils/canvasDrawEverything';
import canvasInit from '~/context/canvas/utils/canvasInit';
import useColorSchemeContext from '~/context/useColorSchemeContext';
import useActionMode from '~/store/useActionMode';
import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasBackgroundColor from '~/store/useCanvasBackgroundColor';
import useCanvasObjects from '~/store/useCanvasObjects';
import useCanvasWorkingSize from '~/store/useCanvasWorkingSize';
import useScrollPosition from '~/store/useScrollPosition';
import useWindowSize from '~/store/useWindowSize';

const Img = styled('img')`
  width: auto;
  max-width: 100%;
  border: 1px solid var(--color-borderPrimary);
`;

export default function CanvasPreview() {
  const [canvasImageSrc, setCanvasImageSrc] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const { colorScheme } = useColorSchemeContext();

  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const windowSize = useWindowSize((state) => state.windowSize);

  const scrollPosition = useScrollPosition((state) => state.scrollPosition);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);

  const canvasWorkingSize = useCanvasWorkingSize((state) => state.canvasWorkingSize);

  const actionMode = useActionMode((state) => state.actionMode);

  const canvasBackgroundColor = useCanvasBackgroundColor((state) => state.canvasBackgroundColor);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) return;
    contextRef.current = context;

    canvasInit({
      canvas,
      context,
      canvasWidth: canvasWorkingSize.width,
      canvasHeight: canvasWorkingSize.height,
    });

    canvasDrawEverything({
      canvas,
      context,
      canvasWorkingSize,
      canvasBackgroundColor,
      canvasObjects,
      activeObjectId,
      actionMode,
      zoom: 100,
      scrollPosition,
      windowSize,
    });

    setCanvasImageSrc(canvas.toDataURL());
  }, [
    actionMode,
    activeObjectId,
    canvasObjects,
    canvasWorkingSize,
    canvasBackgroundColor,
    colorScheme,
    scrollPosition,
    windowSize,
  ]);

  return (
    <>
      {canvasImageSrc && (
        <Img
          style={{
            backgroundImage: `url(${TRANSPARENT_BACKGROUND_IMAGE})`,
            backgroundColor: 'white',
          }}
          src={canvasImageSrc}
          alt="Download preview"
        />
      )}
      <canvas style={{ display: 'none' }} id={CANVAS_PREVIEW_UNIQUE_ID} ref={canvasRef}></canvas>
    </>
  );
}
