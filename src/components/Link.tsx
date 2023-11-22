import NextLink from 'next/link';
import React, { type ReactNode, type CSSProperties } from 'react';
import styled from 'styled-components';

const A = styled.a`
  display: inline-block;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;

interface Props {
  children: ReactNode;
  as?: string;
  href?: string;
  title?: string;
  onClick?: () => void;
  target?: string;
  download?: boolean;
  style?: CSSProperties;
}

export default function Link({ children, as, href, title, onClick = () => undefined, target = '_self', ...rest }: Props) {
  const isNativeAnchor =
    !href || href.startsWith('tel') || href.startsWith('mailto') || href.startsWith('http') || target === '_blank';

  return isNativeAnchor ? (
    <A
      aria-label={title}
      title={title}
      href={href}
      target={target}
      rel={target === '_blank' ? 'nofollow noopener noreferrer' : ''}
      onClick={onClick}
      {...rest}
    >
      {children}
    </A>
  ) : (
    <NextLink as={as} href={href} passHref scroll>
      <A aria-label={title} title={title} onClick={onClick} {...rest}>
        {children}
      </A>
    </NextLink>
  );
}

export const UnderlineLink = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
`;
