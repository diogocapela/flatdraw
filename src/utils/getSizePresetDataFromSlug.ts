import sizePresets from '~/data/sizePresets';

interface SizePresetData {
  slug: string;
  label: string;
  platformSlug: string;
  platformLabel: string;
  presetSlug: string;
  presetLabel: string;
  width: number;
  height: number;
}

export default function getSizePresetDataFromSlug(slug: string | null | undefined): SizePresetData | null {
  if (!slug) {
    return null;
  }

  let result: SizePresetData | null = null;

  Object.entries(sizePresets).forEach(([platformSlug, platformValue]) => {
    Object.entries(platformValue.types).forEach(([presetSlug, presetValue]) => {
      if (slug === `${platformSlug}-${presetSlug}`) {
        result = {
          slug,
          label: `${platformValue.label} ${presetValue.label}`,
          platformSlug,
          platformLabel: platformValue.label,
          presetSlug,
          presetLabel: presetValue.label,
          width: presetValue.width,
          height: presetValue.height,
        };
      }
    });
  });

  return result;
}
