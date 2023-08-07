import orderBy from 'lodash/orderBy';

import type { SizePresetOption } from '~/components/Overlay/OverlayMenu/tabs/MenuTabCanvas/SizePresetSelectItem';
import sizePresets from '~/data/sizePresets';

export default function getSizePresetOptions(): SizePresetOption[] {
  const options: SizePresetOption[] = [];

  Object.entries(sizePresets).forEach(([platformSlug, platformValue]) => {
    Object.entries(platformValue.types).forEach(([presetSlug, presetValue]) => {
      options.push({
        platformSlug,
        value: `${platformSlug}-${presetSlug}`,
        label: `${platformValue.label} ${presetValue.label}`,
        width: presetValue.width,
        height: presetValue.height,
      });
    });
  });

  return orderBy(options, ['label'], ['asc']);
}
