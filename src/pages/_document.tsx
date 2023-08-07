import { createGetInitialProps } from '@mantine/next';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

import metadata from '~/config/metadata';

const getInitialProps = createGetInitialProps();

export default class Document extends NextDocument {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html lang={metadata.website.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
