import { Loader } from '@mantine/core';
import React from 'react';
import styled from 'styled-components';

import metadata from '~/config/metadata';
import theme from '~/theme';

const Div = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #191a1b;
  z-index: ${theme.layers.loadingOverlay};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LogoImg = styled.div`
  width: 120px;
  margin-bottom: 1.5rem;
`;

export default function LoadingOverlay() {
  return (
    <Div>
      <LogoImg src="/images/logo/logo-dark.png" alt={`${metadata.website.name} logo`} />
      <div>
        <Loader />
      </div>
    </Div>
  );
}
