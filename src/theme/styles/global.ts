import { createGlobalStyle } from 'styled-components';

import colors from '~/theme/colors';

export const GlobalStyle = createGlobalStyle`
  :root,
  :root.light {
    ${Object.entries(colors)
      .map(([key, value]) => `--color-${key}: ${value.light};`)
      .join('')}
  }

  :root.dark {
    ${Object.entries(colors)
      .map(([key, value]) => `--color-${key}: ${value.dark};`)
      .join('')}
  }

  body {
    color: var(--color-textPrimary);
    background: var(--color-bgPrimary);
  }
`;
