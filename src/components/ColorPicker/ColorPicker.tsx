import React, { useRef, useState, type CSSProperties } from 'react';
import styled from 'styled-components';

import type { ColorPickerType } from '~/config/types';
import useOnClickOutside from '~/hooks/useOnClickOutside';
import useDefaultParams from '~/store/useDefaultParams';
import theme from '~/theme';

import ColorPickerElement from './ColorPickerElement';

const SIZE = '30px';

const WrapperDiv = styled.div`
  position: relative;
`;

const ClickButton = styled.button`
  display: grid;
  grid-template-columns: minmax(0, ${SIZE}) minmax(0, 1fr);
  height: ${SIZE};
  border: 1px solid var(--color-borderPrimary);
  border-radius: 5px;
  overflow: hidden;
  width: 100%;
  background: var(--color-background-primary);
  cursor: pointer;
  align-items: center;
  text-align: left;
`;

const ColorDiv = styled.div<{ $background: string }>`
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: ${(props) => props.$background};
`;

const TextDiv = styled.div`
  height: 100%;
  width: 100%;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem 0;
  border: none;
  background: var(--color-background-primary);
  color: var(--color-textPrimary);
  border-left: 1px solid var(--color-borderPrimary);
  display: flex;
  align-items: center;
`;

const PopupDiv = styled.div`
  position: absolute;
  top: calc(${SIZE} + 0.5rem);
  left: 0;
`;

interface Props {
  color: string;
  onChange: (color: string) => void;
  disableAlpha?: boolean;
  typeOverride?: ColorPickerType;
  className?: string;
  style?: CSSProperties;
}

export default function ColorPicker({ color, onChange, disableAlpha = true, typeOverride, className, style }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const defaultParams = useDefaultParams((state) => state.defaultParams);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(wrapperRef, () => {
    setIsOpen(false);
  });

  const StyledColorPicker = styled(ColorPickerElement)`
    position: fixed !important;
    bottom: ${theme.variables.overlayGutter};
    right: ${theme.variables.overlayGutter};

    ${theme.medias.gteMedium} {
      bottom: auto;
      top: calc(${theme.variables.overlayGutter} + ${theme.variables.overlayGutter} + ${theme.variables.topNavbarHeight});
      left: calc(${theme.variables.overlayGutter} + ${theme.variables.overlayGutter} + ${theme.variables.sidebarWidth});
      right: auto;
    }
  `;

  return (
    <WrapperDiv ref={wrapperRef} className={className} style={style}>
      <ClickButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <ColorDiv $background={color} />
        <TextDiv>{color?.toUpperCase()}</TextDiv>
      </ClickButton>
      {isOpen && (
        <PopupDiv style={{ zIndex: theme.layers.colorPickerPopover }}>
          <StyledColorPicker
            type={typeOverride || defaultParams.activeColorPicker}
            disableAlpha={disableAlpha}
            color={color}
            onChange={(color) => {
              onChange(color.hex);
            }}
            onClose={() => {
              setIsOpen(false);
            }}
          />
        </PopupDiv>
      )}
    </WrapperDiv>
  );
}
