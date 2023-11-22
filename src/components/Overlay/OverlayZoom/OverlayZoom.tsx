import styled from 'styled-components';
import { ActionIcon, Tooltip } from '@mantine/core';
import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { IoLocateSharp } from 'react-icons/io5';

import useCanvasContext from '~/context/useCanvasContext';
import useZoom from '~/store/useZoom';
import theme from '~/theme';

const Ul = styled.ul`
  pointer-events: auto;
  width: 100%;
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, auto));
  align-items: center;
  grid-gap: ${theme.variables.overlayItemsGutter};

  & > li {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function OverlayZoom() {
  const { setCenter } = useCanvasContext();

  const zoom = useZoom((state) => state.zoom);
  const incrementZoom = useZoom((state) => state.incrementZoom);
  const decrementZoom = useZoom((state) => state.decrementZoom);

  return (
    <Ul>
      <li>
        <Tooltip position="top" label="Reset position" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              setCenter();
            }}
          >
            <IoLocateSharp />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Decrement zoom" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              decrementZoom(5);
            }}
          >
            <FaMinus />
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Set default zoom" offset={8}>
          <ActionIcon
            sx={{ width: '70px' }}
            size="xl"
            variant="default"
            onClick={() => {
              setCenter();
            }}
          >
            {`${Math.trunc(Math.abs(zoom))}%`}
          </ActionIcon>
        </Tooltip>
      </li>
      <li>
        <Tooltip position="top" label="Increment zoom" offset={8}>
          <ActionIcon
            size="xl"
            variant="default"
            onClick={() => {
              incrementZoom(5);
            }}
          >
            <FaPlus />
          </ActionIcon>
        </Tooltip>
      </li>
    </Ul>
  );
}
