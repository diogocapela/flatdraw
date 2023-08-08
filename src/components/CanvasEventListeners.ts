import { useEffect } from 'react';

import { APP_FIXED_MAIN_UNIQUE_ID } from '~/config/globalElementIds';
import useCanvasContext from '~/context/canvas/useCanvasContext';
import useModalContext from '~/context/useModalContext';
import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useScrollPosition from '~/store/useScrollPosition';
import useWindowSize from '~/store/useWindowSize';

export default function CanvasEventListeners() {
  const { isModalActive } = useModalContext();
  const { canvasRef, initCanvas, drawEverything } = useCanvasContext();
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const setWindowSize = useWindowSize((state) => state.setWindowSize);

  const deleteCanvasObject = useCanvasObjects((state) => state.deleteCanvasObject);

  const updateScrollPosition = useScrollPosition((state) => state.updateScrollPosition);

  // Set initial window size

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, [setWindowSize]);

  // Resize event

  useEffect(() => {
    const onResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
      initCanvas();
      drawEverything();
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [setWindowSize, initCanvas, drawEverything]);

  // Wheel event

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      if (isModalActive) return;
      updateScrollPosition({
        deltaX: event.deltaX * -1,
        deltaY: event.deltaY * -1,
      });
    };

    document.getElementById(APP_FIXED_MAIN_UNIQUE_ID)?.addEventListener('wheel', onWheel);
    return () => {
      document.getElementById(APP_FIXED_MAIN_UNIQUE_ID)?.removeEventListener('wheel', onWheel);
    };
  }, [canvasRef, isModalActive, updateScrollPosition]);

  // Keydown event

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isModalActive) return;
      if (['Backspace', 'Delete'].includes(event.key) && activeObjectId) {
        deleteCanvasObject(activeObjectId);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isModalActive, activeObjectId, deleteCanvasObject]);

  // Onbeforeunload event

  useEffect(() => {
    const onBeforeUnload = () => {
      return confirm('Are you sure?');
    };

    window.addEventListener('onbeforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('onbeforeunload', onBeforeUnload);
    };
  }, []);

  // gesturestart event

  useEffect(() => {
    const onGestureStart = (event: Event) => {
      event.preventDefault();
    };

    window.addEventListener('ongesturestart', onGestureStart);
    return () => {
      window.removeEventListener('ongesturestart', onGestureStart);
    };
  }, []);

  return null;
}
