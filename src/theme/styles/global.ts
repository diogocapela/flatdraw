import { css } from '@emotion/react';

import colors from '../colors';

export default css`
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
