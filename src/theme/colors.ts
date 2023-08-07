import type { ColorScheme } from '@mantine/core';

const colors = {
  htmlBackground: {
    light: '#191a1b',
    dark: '#191a1b',
  },
  textPrimary: {
    light: '#111111',
    dark: '#ffffff',
  },
  textSecondary: {
    light: '#444444',
    dark: '#f1f1f1',
  },
  bgPrimary: {
    light: '#ffffff',
    dark: '#111111',
  },
  bgSecondary: {
    light: '#f5f5f5',
    dark: '#444444',
  },
  borderPrimary: {
    light: '#ced4da',
    dark: '#373A40',
  },
} satisfies Record<string, Record<ColorScheme, `#${string}`>>;

export default colors;
