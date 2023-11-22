import { Button } from '@mantine/core';
import React from 'react';
import { MdFlipToFront, MdFlipToBack } from 'react-icons/md';
import styled from 'styled-components';

import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';

import ControlHeader from '../components/ControlHeader';

const ActionsUl = styled.ul`
  list-style: none;
  padding: 0;
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(0, auto));
  grid-gap: 6px;
`;

export default function LayerControl() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const setCanvasObjectLayerIndex = useCanvasObjects((state) => state.setCanvasObjectLayerIndex);

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  if (!activeObject) {
    return null;
  }

  const activeObjectLayerIndex = canvasObjects.findIndex((object) => object.id === activeObject?.id);
  const totalLayers = canvasObjects.length;

  return (
    <>
      <ControlHeader title="Layer" subtitle={`(${activeObjectLayerIndex + 1}/${totalLayers})`} />
      <ActionsUl>
        <li>
          <Button
            title="Send backward"
            disabled={canvasObjects.findIndex((object) => object.id === activeObject.id) === 0}
            leftIcon={<MdFlipToBack />}
            variant="default"
            size="xs"
            onClick={() => {
              setCanvasObjectLayerIndex(activeObject.id, activeObjectLayerIndex - 1);
            }}
          >
            Backward
          </Button>
        </li>
        <li>
          <Button
            title="Bring forward"
            disabled={canvasObjects.findIndex((object) => object.id === activeObject.id) === canvasObjects.length - 1}
            leftIcon={<MdFlipToFront />}
            variant="default"
            size="xs"
            onClick={() => {
              setCanvasObjectLayerIndex(activeObject.id, activeObjectLayerIndex + 1);
            }}
          >
            Forward
          </Button>
        </li>
      </ActionsUl>
    </>
  );
}
