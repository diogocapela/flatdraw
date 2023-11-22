import { createGetInitialProps } from '@mantine/next';
import NextDocument, { Html, Head, Main, NextScript, type DocumentContext } from 'next/document';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';

import metadata from '~/config/metadata';

const getInitialProps = createGetInitialProps();

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();

    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const mantineProps = await getInitialProps(ctx);

      return {
        ...mantineProps,
        styles: (
          <>
            {mantineProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } catch (error) {
      console.error(error);
    } finally {
      sheet.seal();
    }
  }

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
