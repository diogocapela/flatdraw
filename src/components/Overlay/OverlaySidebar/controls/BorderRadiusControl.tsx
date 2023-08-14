import { Slider } from '@mantine/core';
import React from 'react';

import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';

import ControlHeader from '../components/ControlHeader';

export default function BorderRadiusControl() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  if (!activeObject) {
    return null;
  }

  return (
    <>
      <ControlHeader title="Border Radius" />
      <Slider
        key={`border-radius-slider-${activeObject.id}`}
        size="sm"
        min={0}
        max={Math.min(activeObject.width, activeObject.height)}
        value={activeObject.borderRadius}
        onChange={(value) => {
          updateCanvasObject(activeObject.id, {
            borderRadius: value,
          });
        }}
        label={(value) => `${value} px`}
      />
    </>
  );
}
