import { Global } from '@emotion/react';
import { MantineProvider, ColorSchemeProvider, type ColorScheme } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { NavigationProgress, nprogress } from '@mantine/nprogress';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import React, { useEffect, useState } from 'react';

import '~/theme/styles/global.css';
import LoadingOverlay from '~/components/LoadingOverlay';
import metadata from '~/config/metadata';
import { DEFAULT_COLOR_SCHEME } from '~/config/settings';
import { CanvasContextProvider } from '~/context/useCanvasContext/useCanvasContext';
import { ColorSchemeContextProvider } from '~/context/useColorSchemeContext';
import { ModalContextProvider } from '~/context/useModalContext';
import useCookies from '~/hooks/useCookies';
import useAvailableFonts from '~/store/useAvailableFonts';
import theme from '~/theme';
import colors from '~/theme/colors';
import globalStyles from '~/theme/styles/global';
import getAvailableFonts from '~/utils/getAvailableFonts';

function RouterTransition() {
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url: string) => url !== router.asPath && nprogress.start();
    const handleComplete = () => nprogress.complete();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return <NavigationProgress autoReset={true} progressLabel="Loading page" />;
}

export default function App({ Component, pageProps, router }: AppProps) {
  const { getDeviceHash, setDeviceHash, getSavedColoScheme, setSavedColoScheme } = useCookies();

  const setAvailableFonts = useAvailableFonts((state) => state.setAvailableFonts);

  const [hasAppLoaded, setHasAppLoaded] = useState<boolean>(false);
  const [colorScheme, setColorScheme] = useState<ColorScheme>(DEFAULT_COLOR_SCHEME);

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setSavedColoScheme(nextColorScheme);
    const html = document.querySelector('html');
    const body = document.querySelector('body');
    if (html && body) {
      html.style.background = colors.htmlBackground[nextColorScheme];
      body.style.background = colors.htmlBackground[nextColorScheme];
    }
  };

  // On app load

  useEffect(() => {
    // Initialize color scheme
    const savedColorScheme = getSavedColoScheme();
    if (savedColorScheme) {
      toggleColorScheme(savedColorScheme);
    }
    // Initialize device hash
    const deviceHash = getDeviceHash();
    if (!deviceHash) {
      setDeviceHash();
    }
    // Initialize store
    (async () => {
      const result = await getAvailableFonts();
      setAvailableFonts(result);
    })();
    // Set app ready
    setHasAppLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageUrl = `${metadata.website.url}${router.asPath}`;

  return (
    <>
      <NextHead>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"
        />
        <meta name="format-detection" content="telephone=no" />

        {/* Manifest */}
        <link rel="manifest" href={metadata.website.manifest} />

        {/* Icon */}
        <link rel="shortcut icon" href={`${metadata.website.url}/images/favicon/favicon.ico`} />
        <link rel="icon" type="image/x-icon" href={`${metadata.website.url}/images/favicon/favicon.ico`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${metadata.website.url}/images/favicon/apple-touch-icon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${metadata.website.url}/images/favicon/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${metadata.website.url}/images/favicon/favicon-16x16.png`} />

        {/* Browser Theme */}
        <meta name="theme-color" content={metadata.website.themeColor} />
        <meta name="msapplication-TileColor" content={metadata.website.themeColor} />

        {/* Search Engines */}
        <meta name="robots" content="index, follow" />

        {/* Name */}
        <meta name="application-name" content={metadata.website.name} />
        <meta name="copyright" content={metadata.website.name} />
        <meta name="author" content={metadata.website.name} />
        <meta name="owner" content={metadata.website.name} />
        <meta name="designer" content={metadata.website.name} />
        <meta property="og:site_name" content={metadata.website.name} />

        {/* Page URL */}
        <meta name="url" content={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <link rel="canonical" href={pageUrl} />

        {/* Social */}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={`@${metadata.social.twitter}`} />
        <meta name="twitter:creator" content={`@${metadata.social.twitter}`} />
      </NextHead>
      <Global styles={globalStyles} />
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <ColorSchemeContextProvider>
          <CanvasContextProvider>
            <MantineProvider theme={{ colorScheme }} withNormalizeCSS withGlobalStyles>
              <ModalsProvider>
                <ModalContextProvider>
                  {!hasAppLoaded && <LoadingOverlay />}
                  <RouterTransition />
                  <Notifications position="top-right" zIndex={theme.layers.notifications} />
                  <Component {...pageProps} />
                </ModalContextProvider>
              </ModalsProvider>
            </MantineProvider>
          </CanvasContextProvider>
        </ColorSchemeContextProvider>
      </ColorSchemeProvider>
      <GoogleAnalytics
        gaMeasurementId={metadata.services.googleAnalyticsMeasurementId}
        strategy="afterInteractive"
        trackPageViews
      />
    </>
  );
}
