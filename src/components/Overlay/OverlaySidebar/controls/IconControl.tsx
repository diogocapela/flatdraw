import styled from '@emotion/styled';
import { Input, Button, ActionIcon, Tooltip } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import * as aiIcons from 'react-icons/ai';
import * as biIcons from 'react-icons/bi';
import * as cgIcons from 'react-icons/cg';
import * as ciIcons from 'react-icons/ci';
import * as diIcons from 'react-icons/di';
import * as faIcons from 'react-icons/fa';
import * as fcIcons from 'react-icons/fc';
import * as fiIcons from 'react-icons/fi';
import * as giIcons from 'react-icons/gi';
import * as goIcons from 'react-icons/go';
import * as grIcons from 'react-icons/gr';
import * as hiIcons from 'react-icons/hi';
import * as hi2Icons from 'react-icons/hi2';
import * as imIcons from 'react-icons/im';
import * as ioIcons from 'react-icons/io';
import * as io5Icons from 'react-icons/io5';
import * as mdIcons from 'react-icons/md';
import * as riIcons from 'react-icons/ri';
import * as rxIcons from 'react-icons/rx';
import * as siIcons from 'react-icons/si';
import * as slIcons from 'react-icons/sl';
import * as tbIcons from 'react-icons/tb';
import * as tfiIcons from 'react-icons/tfi';
import * as tiIcons from 'react-icons/ti';
import * as vscIcons from 'react-icons/vsc';
import * as wiIcons from 'react-icons/wi';

import useCanvasContext from '~/context/canvas/useCanvasContext';
import useActiveObjectId from '~/store/useActiveObjectId';
import useCanvasObjects from '~/store/useCanvasObjects';
import useDefaultParams from '~/store/useDefaultParams';
import useUserMode from '~/store/useUserMode';
import generateUniqueId from '~/utils/generateUniqueId';
import getDimensionsFromSVGIconObject from '~/utils/getDimensionsFromSVGIconObject';

import SidebarItemHeader from '../components/SidebarItemHeader';

const iconEntries = Object.entries({
  ...aiIcons,
  ...biIcons,
  //...bsIcons, not working
  ...cgIcons,
  ...ciIcons,
  ...diIcons,
  ...faIcons,
  ...fcIcons,
  ...fiIcons,
  ...giIcons,
  ...goIcons,
  ...grIcons,
  ...hi2Icons,
  ...hiIcons,
  ...imIcons,
  ...io5Icons,
  ...ioIcons,
  ...mdIcons,
  ...riIcons,
  ...rxIcons,
  ...siIcons,
  ...slIcons,
  ...tbIcons,
  ...tfiIcons,
  ...tiIcons,
  ...vscIcons,
  ...wiIcons,
});

const GridDiv = styled('div')`
  width: 100%;
  pointer-events: auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  margin: 10px 0;
  border: 0.0625rem solid var(--color-borderPrimary);
  border-radius: 0.25rem;
`;

interface Props {
  pageSize?: number;
}

export default function IconControl({ pageSize = 60 }: Props) {
  const [visibleIcons, setVisibleIcons] = useState<number>(pageSize);
  const { contextRef } = useCanvasContext();

  const defaultParams = useDefaultParams((state) => state.defaultParams);
  const setDefaultParams = useDefaultParams((state) => state.setDefaultParams);

  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);

  const setUserMode = useUserMode((state) => state.setUserMode);

  const appendIconObject = useCanvasObjects((state) => state.appendIconObject);

  const iconEntriesToRender = iconEntries
    .filter(([slug]) => slug.toLowerCase().includes(defaultParams.searchQueryIcons.toLowerCase()))
    .slice(0, visibleIcons);

  const hasMore = visibleIcons <= iconEntriesToRender.length;

  useEffect(() => {
    setVisibleIcons(pageSize);
  }, [pageSize, defaultParams.searchQueryIcons]);

  return (
    <>
      <SidebarItemHeader title="Search Icons" />
      <Input
        size="xs"
        type="search"
        placeholder="Search"
        value={defaultParams.searchQueryIcons}
        onChange={(event) => {
          setDefaultParams({
            searchQueryIcons: event.currentTarget.value,
          });
        }}
        icon={<cgIcons.CgSearch size={12} style={{ transform: 'translateY(1px)' }} />}
      />
      {iconEntriesToRender.length > 0 ? (
        <>
          <GridDiv>
            {iconEntriesToRender.map(([key, Icon]) => (
              <Tooltip key={key} position="bottom" withArrow label={key}>
                <ActionIcon
                  sx={{ width: '100%' }}
                  size="xl"
                  onClick={() => {
                    const svgPath =
                      Icon({}).props.children[0].props.d ||
                      ReactDOMServer.renderToString(<Icon />)
                        ?.split('<path d="')?.[1]
                        ?.split('"></path></svg>')?.[0];
                    const dimensions = getDimensionsFromSVGIconObject({
                      context: contextRef?.current,
                      iconObject: { x: 0, y: 0, width: 0, height: 0, svgPath },
                    });
                    const createdObjectId = generateUniqueId();
                    appendIconObject({
                      id: createdObjectId,
                      x: 0,
                      y: 0,
                      width: dimensions.initialWidth,
                      height: dimensions.initialHeight,
                      backgroundColorHex: defaultParams.backgroundColorHex,
                      opacity: 100,
                      svgPath,
                    });
                    setActiveObjectId(createdObjectId);
                    setUserMode('select');
                  }}
                >
                  <Icon style={{ width: '60%', height: '60%' }} />
                </ActionIcon>
              </Tooltip>
            ))}
          </GridDiv>
          {hasMore && (
            <Button
              leftIcon={<aiIcons.AiOutlineDown style={{ transform: 'translateY(1px)' }} />}
              variant="default"
              size="xs"
              onClick={() => {
                setVisibleIcons((prevVisibleIcons) => prevVisibleIcons + pageSize);
              }}
            >
              Load more icons
            </Button>
          )}
        </>
      ) : (
        <>
          <p style={{ fontSize: '0.95rem', marginTop: '0.5rem', marginBottom: '0.6rem' }}>No results found.</p>
          <Button
            leftIcon={<cgIcons.CgClose />}
            variant="default"
            size="xs"
            onClick={() => {
              setDefaultParams({
                searchQueryIcons: '',
              });
            }}
          >
            Clear
          </Button>
        </>
      )}
    </>
  );
}
