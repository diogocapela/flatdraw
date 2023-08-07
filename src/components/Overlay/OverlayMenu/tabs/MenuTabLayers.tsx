import styled from '@emotion/styled';
import { ActionIcon, Tooltip } from '@mantine/core';
import startCase from 'lodash/startCase';
import React from 'react';
import { BiTrash } from 'react-icons/bi';

import useCanvasObjects from '~/store/useCanvasObjects';
import theme from '~/theme';

import { H4, TextP } from '../commonTabComponents';

const LayersUl = styled('ul')`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.75rem;
`;

const LayerLi = styled('li')`
  border: 1px solid var(--color-borderPrimary);
  border-radius: 5px;
  overflow: hidden;
  padding: 0.6rem 0.2rem 0.6rem 0.6rem;
  display: grid;
  grid-template-columns: 14px minmax(0, auto) minmax(0, 1fr) minmax(0, 30px);
  grid-gap: 0.5rem;
  align-items: center;
  cursor: help;

  ${theme.medias.gteMedium} {
    padding: 0.9rem 0.5rem 0.9rem 0.9rem;
    grid-gap: 0.5rem;
  }

  & > span:first-of-type {
    display: block;
    width: 14px;
    height: 14px;
  }

  & > b:first-of-type {
    font-size: 0.8rem;

    ${theme.medias.gteMedium} {
      font-size: 1rem;
    }
  }

  & > p:last-of-type {
    margin-bottom: 0;
    font-size: 0.9rem;
  }
`;

export default function MenuTabLayers() {
  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const deleteCanvasObject = useCanvasObjects((state) => state.deleteCanvasObject);

  return (
    <>
      <H4>Layers</H4>
      {canvasObjects.length === 0 ? (
        <TextP>No objects found.</TextP>
      ) : (
        <LayersUl>
          {[...canvasObjects].reverse().map((object) => (
            <Tooltip
              key={object.id}
              position="bottom-start"
              withArrow
              arrowSize={8}
              arrowOffset={20}
              label={
                <div>
                  <b>Position:</b> {Math.trunc(object.x)}, {Math.trunc(object.y)}
                  <br />
                  <b>Width:</b> {Math.trunc(object.width)} px
                  <br />
                  <b>Height:</b> {Math.trunc(object.height)} px
                  <br />
                  <b>Opacity:</b> {Math.trunc(object.opacity)}%
                  <br />
                  {(object.type === 'rectangle' ||
                    object.type === 'ellipse' ||
                    object.type === 'line' ||
                    object.type === 'arrow') && (
                    <>
                      {object.strokeWidth > 0 && (
                        <>
                          <b>Stroke Width:</b> {object.strokeWidth} px
                          <br />
                        </>
                      )}
                      {object.borderRadius > 0 && (
                        <>
                          <b>Border Radius:</b> {object.borderRadius} px
                          <br />
                        </>
                      )}
                    </>
                  )}
                  {object.type === 'text' && (
                    <>
                      <b>Font Family:</b> {object.fontFamily}
                      <br />
                      <b>Font Size:</b> {object.fontSize}px
                      <br />
                    </>
                  )}
                </div>
              }
            >
              <LayerLi>
                <span
                  style={{
                    background:
                      object.type === 'text'
                        ? object.fontColorHex
                        : object.type === 'free-draw' || object.type === 'line' || object.type === 'arrow'
                        ? object.strokeColorHex
                        : object.backgroundColorHex,
                  }}
                />
                <b>{startCase(object.type)}</b>
                <p>{object.text}</p>
                <Tooltip label="Delete layer">
                  <ActionIcon
                    onClick={() => {
                      deleteCanvasObject(object.id);
                    }}
                  >
                    <BiTrash />
                  </ActionIcon>
                </Tooltip>
              </LayerLi>
            </Tooltip>
          ))}
        </LayersUl>
      )}
    </>
  );
}
