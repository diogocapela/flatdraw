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

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background: #191a1b;
    max-width: 100vw;
    overflow-x: hidden;
    color: var(--color-textPrimary);
    background: var(--color-bgPrimary);
    font-family: 'Inter', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;
