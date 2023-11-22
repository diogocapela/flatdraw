import styled from 'styled-components';
import React from 'react';

const H4 = styled.h4`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 8px;
  margin-bottom: 4px;
  font-size: 0.9rem;

  &:first-of-type {
    margin-top: 0;
  }

  & > span {
    font-size: 0.8rem;
    opacity: 0.3;
    transform: translateY(1px);
  }
`;

interface Props {
  title: string;
  subtitle?: string;
}

export default function ControlHeader({ title, subtitle }: Props) {
  return (
    <H4>
      {title}
      {subtitle && <span>{subtitle}</span>}
    </H4>
  );
}
