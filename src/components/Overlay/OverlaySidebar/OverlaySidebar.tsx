import styled from '@emotion/styled';
import { NumberInput, Slider, NativeSelect, Textarea, Button, ActionIcon, Tooltip } from '@mantine/core';
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
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight, FaBold, FaItalic, FaSortAmountUp } from 'react-icons/fa';
import {
  MdFlipToFront,
  MdFlipToBack,
  MdControlPointDuplicate,
  MdOutlineDelete,
  MdAlignVerticalTop,
  MdAlignVerticalCenter,
  MdAlignVerticalBottom,
} from 'react-icons/md';

import ColorPicker from '~/components/ColorPicker/ColorPicker';
import useActionMode from '~/store/useActionMode';
import useActiveObjectId from '~/store/useActiveObjectId';
import useAvailableFonts from '~/store/useAvailableFonts';
import useCanvasObjects from '~/store/useCanvasObjects';
import useCanvasWorkingSize from '~/store/useCanvasWorkingSize';
import useDefaultParams from '~/store/useDefaultParams';
import useUserMode from '~/store/useUserMode';
import theme from '~/theme';
import generateUniqueId from '~/utils/generateUniqueId';

import SidebarItemHeader from './components/SidebarItemHeader';
import IconControl from './controls/IconControl';
import ImageControl from './controls/ImageControl';

const GUTTER = '10px';

const Aside = styled('aside')`
  pointer-events: auto;
  background: var(--color-bgPrimary);
  border: 1px solid var(--color-borderPrimary);
  border-radius: 5px;
  padding: ${GUTTER};
  max-height: 270px;
  overflow-y: auto;

  ${theme.medias.gteMedium} {
    max-height: calc(100vh - ${theme.variables.topNavbarHeight} - ${theme.variables.overlayGutter} * 3);
  }
`;

const ActionsUl = styled('ul')`
  list-style: none;
  padding: 0;
  display: inline-grid;
  grid-template-columns: repeat(2, minmax(0, auto));
  grid-gap: 6px;
`;

const FrameGridDiv = styled('div')`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: ${GUTTER};
`;

const AlignGridDiv = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-gap: ${GUTTER};
`;

const TextParamsGrid = styled('div')`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: ${GUTTER};
`;

export default function OverlaySidebar() {
  const activeObjectId = useActiveObjectId((state) => state.activeObjectId);
  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);

  const userMode = useUserMode((state) => state.userMode);

  const actionMode = useActionMode((state) => state.actionMode);

  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);

  const availableFonts = useAvailableFonts((state) => state.availableFonts);

  const canvasWorkingSize = useCanvasWorkingSize((state) => state.canvasWorkingSize);

  const canvasObjects = useCanvasObjects((state) => state.canvasObjects);
  const appendRectangleObject = useCanvasObjects((state) => state.appendRectangleObject);
  const appendFreeDrawObject = useCanvasObjects((state) => state.appendFreeDrawObject);
  const appendTextObject = useCanvasObjects((state) => state.appendTextObject);
  const updateCanvasObject = useCanvasObjects((state) => state.updateCanvasObject);
  const setCanvasObjectLayerIndex = useCanvasObjects((state) => state.setCanvasObjectLayerIndex);

  const deleteCanvasObject = useCanvasObjects((state) => state.deleteCanvasObject);

  const activeObject = canvasObjects.find((object) => object.id === activeObjectId);

  const activeNodes = {
    icons: userMode === 'icon',
    images: userMode === 'image',
    frame: !!activeObject,
    align: !!activeObject,
    backgroundColor: activeObject?.type === 'rectangle' || activeObject?.type === 'ellipse' || activeObject?.type === 'icon',
    strokeWidth: !!activeObject && activeObject.type !== 'text' && activeObject.type !== 'icon' && activeObject.type !== 'image',
    strokeColor:
      !!activeObject &&
      activeObject.type !== 'text' &&
      activeObject.type !== 'icon' &&
      activeObject.type !== 'image' &&
      (activeObject?.strokeWidth || 0) > 0,
    borderRadius: activeObject?.type === 'rectangle' || activeObject?.type === 'ellipse',
    text: activeObject?.type === 'text',
    opacity: !!activeObject,
    layer: !!activeObject,
    actions: !!activeObject,
  };

  const hasActiveNodes = Object.values(activeNodes).some((value) => value);

  if (!hasActiveNodes || actionMode?.type === 'isDrawing') {
    return null;
  }

  const activeObjectLayerIndex = canvasObjects.findIndex((object) => object.id === activeObject?.id);
  const totalLayers = canvasObjects.length;

  const frameOptions: {
    label: string;
    value: number;
    onChange: (value: number) => void;
  }[] = activeObject
    ? [
        {
          label: 'X',
          value: activeObject.x,
          onChange: (value: number) => {
            if (Number.isFinite(value)) {
              updateCanvasObject(activeObject.id, { x: value });
            }
          },
        },
        {
          label: 'Y',
          value: activeObject.y,
          onChange: (value: number) => {
            if (Number.isFinite(value)) {
              updateCanvasObject(activeObject.id, { y: value });
            }
          },
        },
        {
          label: 'W',
          value: activeObject.width,
          onChange: (value: number) => {
            if (Number.isFinite(value)) {
              updateCanvasObject(activeObject.id, { width: value });
            }
          },
        },
        {
          label: 'H',
          value: activeObject.height,
          onChange: (value: number) => {
            if (Number.isFinite(value)) {
              updateCanvasObject(activeObject.id, { height: value });
            }
          },
        },
      ]
    : [];

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

  const textAlignOptions: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    isActive: boolean;
  }[] = activeObject
    ? [
        {
          label: 'Left',
          icon: <FaAlignLeft />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              textAlignHorizontal: 'left',
            });
          },
          isActive: activeObject.textAlignHorizontal === 'left',
        },
        {
          label: 'Center',
          icon: <FaAlignCenter />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              textAlignHorizontal: 'center',
            });
          },
          isActive: activeObject.textAlignHorizontal === 'center',
        },
        {
          label: 'Right',
          icon: <FaAlignRight />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              textAlignHorizontal: 'right',
            });
          },
          isActive: activeObject.textAlignHorizontal === 'right',
        },
        {
          label: 'Justify',
          icon: <FaAlignJustify />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              textJustify: !activeObject.textJustify,
            });
          },
          isActive: activeObject.textJustify,
        },
        {
          label: 'Top',
          icon: <MdAlignVerticalTop />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              textAlignVertical: 'top',
            });
          },
          isActive: activeObject.textAlignVertical === 'top',
        },
        {
          label: 'Middle',
          icon: <MdAlignVerticalCenter />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              textAlignVertical: 'middle',
            });
          },
          isActive: activeObject.textAlignVertical === 'middle',
        },
        {
          label: 'Bottom',
          icon: <MdAlignVerticalBottom />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              textAlignVertical: 'bottom',
            });
          },
          isActive: activeObject.textAlignVertical === 'bottom',
        },
      ]
    : [];

  const fontStyleOptions: {
    label: string;
    icon: ReactNode;
    onClick: () => void;
    isActive: boolean;
  }[] = activeObject
    ? [
        {
          label: 'Bold',
          icon: <FaBold />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              fontWeight: activeObject.fontWeight === 'normal' ? 'bold' : 'normal',
            });
          },
          isActive: activeObject.fontWeight === 'bold',
        },
        {
          label: 'Italic',
          icon: <FaItalic />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              fontStyle: activeObject.fontStyle === 'normal' ? 'italic' : 'normal',
            });
          },
          isActive: activeObject.fontStyle === 'italic',
        },
        {
          label: 'Small Caps',
          icon: <FaSortAmountUp />,
          onClick: () => {
            updateCanvasObject(activeObject.id, {
              fontVariant: activeObject.fontVariant === 'normal' ? 'small-caps' : 'normal',
            });
          },
          isActive: activeObject.fontVariant === 'small-caps',
        },
      ]
    : [];

  return (
    <Aside>
      <div>
        {activeNodes.frame && (
          <>
            <SidebarItemHeader title="Frame" />
            <FrameGridDiv>
              {frameOptions.map(({ label, value, onChange }) => (
                <NumberInput
                  key={label}
                  size="xs"
                  style={{ width: '100%' }}
                  value={Math.trunc(value)}
                  onChange={onChange}
                  icon={<span style={{ fontSize: '12px' }}>{label}</span>}
                  hideControls
                />
              ))}
            </FrameGridDiv>
          </>
        )}
        {activeNodes.images && (
          <>
            <ImageControl />
          </>
        )}
        {activeNodes.icons && (
          <>
            <IconControl />
          </>
        )}
        {activeNodes.backgroundColor && activeObject && (
          <>
            <SidebarItemHeader title="Background" />
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
        )}
        {activeNodes.strokeWidth && activeObject && (
          <>
            <SidebarItemHeader title="Stroke Width" />
            <Slider
              key={`stroke-width-slider-${activeObject.id}`}
              size="sm"
              min={activeObject.type === 'free-draw' ? 1 : 0}
              max={
                activeObject.type === 'free-draw' ? 100 : Math.floor(Math.min(activeObject.width / 2, activeObject.height / 2))
              }
              value={activeObject.strokeWidth}
              onChange={(value) => {
                updateCanvasObject(activeObject.id, {
                  strokeWidth: value,
                });
              }}
              label={(value) => `${value} px`}
            />
          </>
        )}
        {activeNodes.strokeColor && activeObject && (
          <>
            <SidebarItemHeader title="Stroke Color" />
            <ColorPicker
              key={`stroke-color-picker-${activeObject.id}`}
              color={activeObject.strokeColorHex}
              onChange={(color) => {
                updateCanvasObject(activeObject.id, {
                  strokeColorHex: color,
                });
                setDefaultParams({
                  strokeColorHex: color,
                });
              }}
            />
          </>
        )}
        {activeNodes.borderRadius && activeObject && (
          <>
            <SidebarItemHeader title="Border Radius" />
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
        )}
        {activeNodes.text && activeObject && (
          <>
            <SidebarItemHeader title="Text" />
            <Textarea
              key={`text-input-${activeObject.id}`}
              size="xs"
              value={activeObject.text}
              onChange={(event) => {
                updateCanvasObject(activeObject.id, {
                  text: event.target.value,
                });
              }}
            />
            <SidebarItemHeader title="Text Align" />
            <TextParamsGrid>
              {textAlignOptions.map(({ label, icon, onClick, isActive }) => (
                <Tooltip key={label} label={label} position="top">
                  <Button variant={isActive ? 'outline' : 'default'} color="dark" size="xs" onClick={onClick}>
                    {icon}
                  </Button>
                </Tooltip>
              ))}
            </TextParamsGrid>
            <SidebarItemHeader title="Font Family" />
            <NativeSelect
              key={`font-family-select-${activeObject.id}`}
              size="xs"
              data={[
                { value: 'font-family-select-generic', label: 'Generic', disabled: true },
                { value: 'cursive', label: 'Cursive' },
                { value: 'fantasy', label: 'Fantasy' },
                { value: 'monospace', label: 'Monospace' },
                { value: 'sans-serif', label: 'Sans-serif' },
                { value: 'serif', label: 'Serif' },
                { value: 'font-family-select-specific', label: 'Specific', disabled: true },
                ...availableFonts.map((fontFamily) => ({
                  value: fontFamily,
                  label: fontFamily,
                })),
              ]}
              value={activeObject.fontFamily}
              onChange={(event) => {
                updateCanvasObject(activeObject.id, {
                  fontFamily: event.target.value,
                });
              }}
            />
            <SidebarItemHeader title="Font Color" />
            <ColorPicker
              key={`font-color-picker-${activeObject.id}`}
              color={activeObject.fontColorHex}
              onChange={(color) => {
                updateCanvasObject(activeObject.id, {
                  fontColorHex: color,
                });
                setDefaultParams({
                  fontColorHex: color,
                });
              }}
            />
            <SidebarItemHeader title="Font Style" />
            <TextParamsGrid>
              {fontStyleOptions.map(({ label, icon, onClick, isActive }) => (
                <Tooltip key={label} label={label} position="top">
                  <Button variant={isActive ? 'outline' : 'default'} color="dark" size="xs" onClick={onClick}>
                    {icon}
                  </Button>
                </Tooltip>
              ))}
            </TextParamsGrid>
            <SidebarItemHeader title="Font Size" />
            <Slider
              key={`font-size-slider-${activeObject.id}`}
              size="sm"
              min={1}
              max={400}
              value={activeObject.fontSize}
              onChange={(value) => {
                updateCanvasObject(activeObject.id, {
                  fontSize: value,
                });
              }}
              label={(value) => `${value} px`}
            />
            <SidebarItemHeader title="Line Height" />
            <Slider
              key={`font-line-height-slider-${activeObject.id}`}
              size="sm"
              min={0.5}
              max={2.5}
              step={0.1}
              value={activeObject.fontLineHeightRatio}
              onChange={(value) => {
                updateCanvasObject(activeObject.id, {
                  fontLineHeightRatio: value,
                });
              }}
              label={(value) => value.toFixed(1)}
            />
          </>
        )}

        {activeNodes.opacity && activeObject && (
          <>
            <SidebarItemHeader title="Opacity" />
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
        )}
        {activeNodes.align && (
          <>
            <SidebarItemHeader title="Align" />
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
        )}
        {activeNodes.layer && activeObject && (
          <>
            <SidebarItemHeader title="Layer" subtitle={`(${activeObjectLayerIndex + 1}/${totalLayers})`} />
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
        )}
        {activeNodes.actions && activeObject && (
          <>
            <SidebarItemHeader title="Actions" />
            <ActionsUl>
              <li>
                <Button
                  leftIcon={<MdControlPointDuplicate />}
                  variant="default"
                  size="xs"
                  onClick={() => {
                    const newId = generateUniqueId();
                    const duplicatedObject = {
                      ...activeObject,
                      id: newId,
                      x: activeObject.x + 50,
                      y: activeObject.y + 50,
                    };
                    switch (activeObject.type) {
                      case 'free-draw':
                        appendFreeDrawObject(duplicatedObject);
                        break;
                      case 'text':
                        appendTextObject(duplicatedObject);
                        break;
                      case 'rectangle':
                      default:
                        appendRectangleObject(duplicatedObject);
                        break;
                    }
                    setActiveObjectId(newId);
                  }}
                >
                  Duplicate
                </Button>
              </li>
              <li>
                <Button
                  leftIcon={<MdOutlineDelete />}
                  variant="default"
                  size="xs"
                  onClick={() => {
                    deleteCanvasObject(activeObject.id);
                    setActiveObjectId(null);
                  }}
                >
                  Delete
                </Button>
              </li>
            </ActionsUl>
          </>
        )}
      </div>
    </Aside>
  );
}
