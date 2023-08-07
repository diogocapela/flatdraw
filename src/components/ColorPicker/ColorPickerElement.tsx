import React, { type CSSProperties } from 'react';
import {
  AlphaPicker,
  BlockPicker,
  ChromePicker,
  CirclePicker,
  ColorResult,
  CompactPicker,
  GithubPicker,
  HuePicker,
  MaterialPicker,
  PhotoshopPicker,
  SketchPicker,
  SliderPicker,
  SwatchesPicker,
  TwitterPicker,
} from 'react-color';

import type { ColorPickerType } from '~/config/types';

interface Props {
  type: ColorPickerType;
  color?: string;
  onChange?: (color: ColorResult) => void;
  onClose?: () => void;
  disableAlpha?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function ColorPickerElement({ type, color, onChange, onClose, disableAlpha = true, className, style }: Props) {
  const common = {
    color,
    onChangeComplete: onChange,
    className,
    style,
  };

  switch (type) {
    case 'AlphaPicker':
      return <AlphaPicker {...common} />;
    case 'BlockPicker':
      return <BlockPicker {...common} />;
    case 'ChromePicker':
      return <ChromePicker {...common} disableAlpha={disableAlpha} />;
    case 'CirclePicker':
      return <CirclePicker {...common} />;
    case 'CompactPicker':
      return <CompactPicker {...common} />;
    case 'GithubPicker':
      return <GithubPicker {...common} />;
    case 'HuePicker':
      return <HuePicker {...common} />;
    case 'MaterialPicker':
      return <MaterialPicker {...common} />;
    case 'PhotoshopPicker':
      return <PhotoshopPicker {...common} onCancel={onClose} onAccept={onClose} />;
    case 'SliderPicker':
      return <SliderPicker {...common} />;
    case 'SwatchesPicker':
      return <SwatchesPicker {...common} />;
    case 'TwitterPicker':
      return <TwitterPicker {...common} />;
    case 'SketchPicker':
    default:
      return <SketchPicker {...common} disableAlpha={disableAlpha} />;
  }
}
