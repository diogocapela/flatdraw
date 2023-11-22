import { ActionIcon, Tooltip } from '@mantine/core';
import React, { type ReactNode } from 'react';
import {
  BsArrowDown,
  BsArrowDownLeft,
  BsArrowDownRight,
  BsArrowLeft,
  BsArrowRight,
  BsArrowUp,
  BsArrowUpLeft,
  BsArrowUpRight,
  BsCircle,
} from 'react-icons/bs';
import styled from 'styled-components';

import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useCanvasWorkingSize from '~/store/useCanvasWorkingSize';
import theme from '~/theme';

import ControlHeader from '../components/ControlHeader';

const AlignGridDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: ${theme.variables.sidebarGutter};
`;

export default function AlignControl() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);

  const canvasWorkingSize = useCanvasWorkingSize((state) => state.canvasWorkingSize);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  const objectAlignOptions: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    isActive: boolean;
  }[] = activeObject
    ? [
        {
          label: 'Top-left',
          icon: <BsArrowUpLeft />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              x: 0,
              y: 0,
            });
          },
          isActive: activeObject.x === 0 && activeObject.y === 0,
        },
        {
          label: 'Top-center',
          icon: <BsArrowUp />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              x: (canvasWorkingSize.width - activeObject.width) / 2,
              y: 0,
            });
          },
          isActive: activeObject.x === (canvasWorkingSize.width - activeObject.width) / 2 && activeObject.y === 0,
        },
        {
          label: 'Top-right',
          icon: <BsArrowUpRight />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              x: canvasWorkingSize.width - activeObject.width,
              y: 0,
            });
          },
          isActive: activeObject.x === canvasWorkingSize.width - activeObject.width && activeObject.y === 0,
        },
        {
          label: 'Center-left',
          icon: <BsArrowLeft />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              x: 0,
              y: (canvasWorkingSize.height - activeObject.height) / 2,
            });
          },
          isActive: activeObject.x === 0 && activeObject.y === (canvasWorkingSize.height - activeObject.height) / 2,
        },
        {
          label: 'Center',
          icon: <BsCircle />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              x: (canvasWorkingSize.width - activeObject.width) / 2,
              y: (canvasWorkingSize.height - activeObject.height) / 2,
            });
          },
          isActive:
            activeObject.x === (canvasWorkingSize.width - activeObject.width) / 2 &&
            activeObject.y === (canvasWorkingSize.height - activeObject.height) / 2,
        },
        {
          label: 'Center-right',
          icon: <BsArrowRight />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              x: canvasWorkingSize.width - activeObject.width,
              y: (canvasWorkingSize.height - activeObject.height) / 2,
            });
          },
          isActive:
            activeObject.x === canvasWorkingSize.width - activeObject.width &&
            activeObject.y === (canvasWorkingSize.height - activeObject.height) / 2,
        },
        {
          label: 'Bottom-left',
          icon: <BsArrowDownLeft />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              x: 0,
              y: canvasWorkingSize.height - activeObject.height,
            });
          },
          isActive: activeObject.x === 0 && activeObject.y === canvasWorkingSize.height - activeObject.height,
        },
        {
          label: 'Bottom-center',
          icon: <BsArrowDown />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              x: (canvasWorkingSize.width - activeObject.width) / 2,
              y: canvasWorkingSize.height - activeObject.height,
            });
          },
          isActive:
            activeObject.x === (canvasWorkingSize.width - activeObject.width) / 2 &&
            activeObject.y === canvasWorkingSize.height - activeObject.height,
        },
        {
          label: 'Bottom-right',
          icon: <BsArrowDownRight />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              x: canvasWorkingSize.width - activeObject.width,
              y: canvasWorkingSize.height - activeObject.height,
            });
          },
          isActive:
            activeObject.x === canvasWorkingSize.width - activeObject.width &&
            activeObject.y === canvasWorkingSize.height - activeObject.height,
        },
      ]
    : [];

  return (
    <>
      <ControlHeader title="Align" />
      <AlignGridDiv>
        {objectAlignOptions.map(({ label, icon, onClick, isActive }) => (
          <Tooltip key={label} position="top" label={label}>
            <ActionIcon
              sx={{ width: '100%' }}
              size="md"
              variant={isActive ? 'outline' : 'default'}
              color="dark"
              onClick={onClick}
            >
              {icon}
            </ActionIcon>
          </Tooltip>
        ))}
      </AlignGridDiv>
    </>
  );
}
