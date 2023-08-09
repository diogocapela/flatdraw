import packageJson from '~/../package.json';

const cleanUrl = 'flatdraw.com';

const metadata = {
  website: {
    name: 'Flatdraw',
    slogan: 'Simple Canvas Drawing App',
    description: 'Open-source canvas drawing web application, built with TypeScript, React, and Next.js.',
    cleanUrl,
    email: `hello@${cleanUrl}`,
    url: `https://${cleanUrl}`,
    manifest: `https://${cleanUrl}/manifest.json`,
    thumbnail: `https://${cleanUrl}/images/thumbnail.jpg`,
    locale: 'en',
    themeColor: '#FFFFFF',
    version: packageJson.version,
  },
  social: {
    twitter: 'flatdraw',
  },
  links: {
    github: 'https://github.com/diogocapela/flatdraw',
  },
  services: {
    googleAnalyticsMeasurementId: 'G-EZDBLF0NEZ',
  },
};

export default metadata;
