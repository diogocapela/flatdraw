import { Slider } from '@mantine/core';
import React from 'react';

import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';

import ControlHeader from '../components/ControlHeader';

export default function OpacityControl() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  if (!activeObject) {
    return null;
  }

  return (
    <>
      <ControlHeader title="Opacity" />
      <Slider
        key={`opacity-slider-${activeObject.id}`}
        size="sm"
        min={0}
        max={100}
        value={activeObject.opacity}
        onChange={(value) => {
          updateCanvasObject(activeObject.id, {
            opacity: value,
          });
        }}
        label={(value) => `${value}%`}
      />
    </>
  );
}
