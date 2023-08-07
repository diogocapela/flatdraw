import React from 'react';
import { FaGithub } from 'react-icons/fa';

import Link from '~/components/Link';
import metadata from '~/config/metadata';

import { H4, TextP } from '../commonTabComponents';

export default function MenuTabAbout() {
  return (
    <>
      <H4>About</H4>
      <TextP style={{ marginBottom: '0.75rem' }}>{metadata.website.description}</TextP>
      <TextP style={{ marginBottom: '1rem' }}>
        <Link
          style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600 }}
          href={metadata.links.github}
          target="_blank"
        >
          <FaGithub />
          {metadata.links.github.replace('https://', '')}
        </Link>
      </TextP>
      <H4>Version</H4>
      <TextP>
        {metadata.website.version} © {new Date().getFullYear()}
      </TextP>
    </>
  );
}
