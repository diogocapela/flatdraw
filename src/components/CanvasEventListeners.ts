import { useEffect } from 'react';

import { APP_FIXED_MAIN_UNIQUE_ID, CANVAS_CONTROLS_OVERLAY } from '~/config/globalElementIds';
import { UserMode } from '~/config/types';
import useCanvasContext from '~/context/canvas/useCanvasContext';
import useModalContext from '~/context/useModalContext';
import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useScrollPosition from '~/store/useScrollPosition';
import useUserMode from '~/store/useUserMode';
import useWindowSize from '~/store/useWindowSize';

export default function CanvasEventListeners() {
  const { canvasRef, initCanvas, drawEverything } = useCanvasContext();
  const { isModalActive } = useModalContext();

  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const userMode = useUserMode((state) => state.userMode);
  const setUserMode = useUserMode((state) => state.setUserMode);

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

  // Pointerdown event

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (isModalActive) return;
      const wasCanvasClick = (event.target as HTMLElement)?.id === CANVAS_CONTROLS_OVERLAY;
      const userModesToClose: UserMode[] = ['icon', 'image'];
      if (wasCanvasClick && userModesToClose.includes(userMode)) {
        setUserMode('select');
      }
    };

    window.addEventListener('pointerdown', onPointerDown);
    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
    };
  }, [isModalActive, setUserMode, userMode]);

  // Keydown event

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isModalActive) return;
      const isInputFocused = ['input', 'textarea'].includes(document.activeElement?.localName || '');
      const deleteKeys: KeyboardEvent['key'][] = ['Backspace', 'Delete'];
      if (deleteKeys.includes(event.key) && !isInputFocused && activeObjectId) {
        deleteCanvasObject(activeObjectId);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isModalActive, activeObjectId, deleteCanvasObject]);

  // Beforeunload event

  useEffect(() => {
    const onBeforeUnload = () => {
      return confirm('Are you sure?');
    };

    window.addEventListener('onbeforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('onbeforeunload', onBeforeUnload);
    };
  }, []);

  // Gesturestart event

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
