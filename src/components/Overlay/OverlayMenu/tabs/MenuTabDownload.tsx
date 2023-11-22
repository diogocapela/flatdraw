import { Button, Checkbox } from '@mantine/core';
import React from 'react';
import { FaDownload } from 'react-icons/fa';
import styled from 'styled-components';

import CanvasPreview from '~/components/CanvasPreview';
import { CANVAS_PREVIEW_UNIQUE_ID } from '~/config/globalElementIds';
import useCanvasBackgroundColor from '~/store/useCanvasBackgroundColor';
import useCanvasWorkingSize from '~/store/useCanvasWorkingSize';
import useDefaultParams from '~/store/useDefaultParams';
import generateUniqueId from '~/utils/generateUniqueId';

import { H4 } from '../commonTabComponents';

const DownloadButtonsGridDiv = styled.div`
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 0.5rem;
  margin-bottom: 1rem;
`;

export default function MenuTabDownload() {
  const defaultParams = useDefaultParams((state) => state.defaultParams);

  const canvasWorkingSize = useCanvasWorkingSize((state) => state.canvasWorkingSize);

  const canvasBackgroundColor = useCanvasBackgroundColor((state) => state.canvasBackgroundColor);
  const setCanvasBackgroundColor = useCanvasBackgroundColor((state) => state.setCanvasBackgroundColor);

  const downloadCanvas = (type: 'png' | 'jpg') => {
    const canvas = document.getElementById(CANVAS_PREVIEW_UNIQUE_ID) as HTMLCanvasElement;
    const image = canvas.toDataURL();
    const a = document.createElement('a');
    a.download = `${generateUniqueId()}.${type}`;
    a.href = image;
    a.click();
    a.remove();
  };

  return (
    <>
      <H4>Download</H4>
      <DownloadButtonsGridDiv>
        <Button
          size="xs"
          variant="default"
          onClick={() => {
            downloadCanvas('png');
          }}
          leftIcon={<FaDownload />}
        >
          PNG
        </Button>
        <Button
          size="xs"
          variant="default"
          onClick={() => {
            downloadCanvas('jpg');
          }}
          leftIcon={<FaDownload />}
        >
          JPG
        </Button>
      </DownloadButtonsGridDiv>
      <H4>
        Preview<span>{`${canvasWorkingSize.width} x ${canvasWorkingSize.height} px`}</span>
      </H4>
      <CanvasPreview />
      <Checkbox
        sx={{ marginTop: '1rem' }}
        size="sm"
        label="Transparent Background"
        checked={canvasBackgroundColor === 'transparent'}
        onChange={(event) => {
          if (event.target.checked) {
            setCanvasBackgroundColor('transparent');
          } else {
            setCanvasBackgroundColor(defaultParams.canvasBackgroundColor);
          }
        }}
      />
    </>
  );
}
