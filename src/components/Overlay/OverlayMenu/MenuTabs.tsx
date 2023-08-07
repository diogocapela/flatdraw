import styled from '@emotion/styled';
import { Tabs } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React, { useEffect } from 'react';

import useActiveObjectId from '~/store/useActiveObjectId';
import theme from '~/theme';

import { menuTabsDefinition, type MenuTabId } from './menuTabsDefinition';
import MenuTabAbout from './tabs/MenuTabAbout';
import MenuTabCanvas from './tabs/MenuTabCanvas';
import MenuTabDownload from './tabs/MenuTabDownload';
import MenuTabLayers from './tabs/MenuTabLayers';
import MenuTabSettings from './tabs/MenuTabSettings';

const WrapperDiv = styled('div')`
  width: 100%;
  max-width: 100%;
  pointer-events: all;
`;

const TabDiv = styled('div')`
  padding: 6px 2px;
  display: flex;
  align-items: center;
  gap: 0.65rem;
`;

const PanelContentDiv = styled('div')`
  position: relative;
  height: 700px;
  max-height: 80vh;
  width: 100%;
  max-width: 100%;
  overflow-y: auto;
  padding: 1rem;
`;

interface Props {
  closeModal: () => void;
  initialTab?: MenuTabId;
}

export default function MenuTabs({ closeModal, initialTab = menuTabsDefinition[0].id }: Props) {
  const setActiveObjectId = useActiveObjectId((state) => state.setActiveObjectId);

  const gteMedium = useMediaQuery(theme.medias.gteMedium.replace('@media ', ''));

  useEffect(() => {
    setActiveObjectId(null);
  }, [setActiveObjectId]);

  return (
    <WrapperDiv>
      <Tabs defaultValue={initialTab} orientation="vertical">
        <Tabs.List>
          {menuTabsDefinition.map((tab) => (
            <Tabs.Tab key={tab.id} value={tab.id}>
              <TabDiv>
                {tab.icon}
                {gteMedium ? tab.label : ''}
              </TabDiv>
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.Panel value="canvas">
          <PanelContentDiv>
            <MenuTabCanvas closeModal={closeModal} />
          </PanelContentDiv>
        </Tabs.Panel>
        <Tabs.Panel value="layers">
          <PanelContentDiv>
            <MenuTabLayers />
          </PanelContentDiv>
        </Tabs.Panel>
        <Tabs.Panel value="download">
          <PanelContentDiv>
            <MenuTabDownload />
          </PanelContentDiv>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <PanelContentDiv>
            <MenuTabSettings />
          </PanelContentDiv>
        </Tabs.Panel>
        <Tabs.Panel value="about">
          <PanelContentDiv>
            <MenuTabAbout />
          </PanelContentDiv>
        </Tabs.Panel>
      </Tabs>
    </WrapperDiv>
  );
}
