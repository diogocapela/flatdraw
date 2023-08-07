import styled from '@emotion/styled';
import { Button, Checkbox, NumberInput, Select } from '@mantine/core';
import React from 'react';
import { RxHeight, RxWidth } from 'react-icons/rx';
import { TbTrashX } from 'react-icons/tb';

import ColorPicker from '~/components/ColorPicker';
import useCanvasContext from '~/context/canvas/useCanvasContext';
import useCanvasBackgroundColor from '~/store/useCanvasBackgroundColor';
import useCanvasObjects from '~/store/useCanvasObjects';
import useCanvasWorkingSize from '~/store/useCanvasWorkingSize';
import useDefaultParams from '~/store/useDefaultParams';
import theme from '~/theme';
import getSizePresetDataFromSlug from '~/utils/getSizePresetDataFromSlug';
import getSizePresetOptions from '~/utils/getSizePresetOptions';

import SizePresetSelectItem from './SizePresetSelectItem';
import { H4 } from '../../commonTabComponents';

const CanvasSizeGridDiv = styled('div')`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.75rem;
  margin-bottom: 0.5rem;

  ${theme.medias.gteMedium} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const BackgroundColorDiv = styled('div')`
  margin-top: 0.7rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
`;

const PresetDiv = styled('div')`
  margin-bottom: 1rem;
`;

const data = getSizePresetOptions();

interface Props {
  closeModal: () => void;
}

export default function MenuTabCanvas({ closeModal }: Props) {
  const { setCenter } = useCanvasContext();

  const resetCanvasObjects = useCanvasObjects((state) => state.resetCanvasObjects);

  const defaultParams = useDefaultParams((state) => state.defaultParams);
  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);

  const canvasWorkingSize = useCanvasWorkingSize((state) => state.canvasWorkingSize);
  const setCanvasWorkingWidth = useCanvasWorkingSize((state) => state.setCanvasWorkingWidth);
  const setCanvasWorkingHeight = useCanvasWorkingSize((state) => state.setCanvasWorkingHeight);

  const canvasBackgroundColor = useCanvasBackgroundColor((state) => state.canvasBackgroundColor);
  const setCanvasBackgroundColor = useCanvasBackgroundColor((state) => state.setCanvasBackgroundColor);

  return (
    <>
      <H4>Canvas Size</H4>
      <CanvasSizeGridDiv>
        <NumberInput
          label="Width"
          min={0}
          max={5000}
          value={canvasWorkingSize.width}
          onChange={(value) => {
            if (value && value !== canvasWorkingSize.width) {
              setCanvasWorkingWidth(value);
              setDefaultParams({
                sizePreset: null,
              });
              setCenter();
            }
          }}
          icon={<RxWidth />}
          rightSection="px"
          rightSectionWidth={40}
        />
        <NumberInput
          label="Height"
          min={0}
          max={5000}
          value={canvasWorkingSize.height}
          onChange={(value) => {
            if (value && value !== canvasWorkingSize.height) {
              setCanvasWorkingHeight(value);
              setDefaultParams({
                sizePreset: null,
              });
              setCenter();
            }
          }}
          icon={<RxHeight />}
          rightSection="px"
          rightSectionWidth={40}
        />
      </CanvasSizeGridDiv>
      <PresetDiv>
        <Select
          variant="default"
          size="sm"
          label="Presets"
          placeholder="Search presets"
          itemComponent={SizePresetSelectItem}
          data={data}
          searchable
          value={defaultParams.sizePreset}
          maxDropdownHeight={400}
          nothingFound="No results found"
          filter={(value, item) => !!item.label?.toLowerCase().includes(value.toLowerCase().trim())}
          onChange={(value) => {
            const sizePresetData = getSizePresetDataFromSlug(value);
            if (sizePresetData) {
              setCanvasWorkingWidth(sizePresetData.width);
              setCanvasWorkingHeight(sizePresetData.height);
              setDefaultParams({
                sizePreset: value,
              });
              setCenter();
            }
          }}
        />
      </PresetDiv>
      <H4 style={{ marginBottom: 0 }}>Canvas Background</H4>
      <BackgroundColorDiv>
        {canvasBackgroundColor !== 'transparent' && (
          <ColorPicker
            color={canvasBackgroundColor}
            onChange={(color) => {
              setCanvasBackgroundColor(color);
              setDefaultParams({
                canvasBackgroundColor: color,
              });
            }}
          />
        )}
        <Checkbox
          size="sm"
          label="Transparent"
          checked={canvasBackgroundColor === 'transparent'}
          onChange={(event) => {
            if (event.target.checked) {
              setCanvasBackgroundColor('transparent');
            } else {
              setCanvasBackgroundColor(defaultParams.canvasBackgroundColor);
            }
          }}
        />
      </BackgroundColorDiv>
      <H4>Reset Canvas</H4>
      <Button
        size="xs"
        variant="default"
        leftIcon={<TbTrashX />}
        onClick={() => {
          resetCanvasObjects();
          setCenter();
          closeModal();
        }}
      >
        Reset
      </Button>
    </>
  );
}
