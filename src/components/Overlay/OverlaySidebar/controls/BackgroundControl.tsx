import React from 'react';

import ColorPicker from '~/components/ColorPicker/ColorPicker';
import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useDefaultParams from '~/store/useDefaultParams';

import ControlHeader from '../components/ControlHeader';

export default function BackgroundControl() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  if (!activeObject) {
    return null;
  }

  return (
    <>
      <ControlHeader title="Background" />
      <ColorPicker
        key={`background-color-picker-${activeObject.id}`}
        color={activeObject.backgroundColorHex}
        onChange={(color) => {
          updateCanvasObject(activeObject.id, {
            backgroundColorHex: color,
          });
          setDefaultParams({
            backgroundColorHex: color,
          });
        }}
      />
    </>
  );
}
