import { modals } from '@mantine/modals';
import React, { useContext, useState, useMemo, useCallback, createContext, type ReactNode } from 'react';

import MenuTabs from '~/components/Overlay/OverlayMenu/MenuTabs';
import type { MenuTabId } from '~/components/Overlay/OverlayMenu/menuTabsDefinition';
import theme from '~/theme';

interface ModalContextType {
  isModalActive: boolean;
  openMenuModal: (menuTabId?: MenuTabId) => void;
  closeModal: () => void;
}

const initialState: ModalContextType = {
  isModalActive: false,
  openMenuModal: () => undefined,
  closeModal: () => undefined,
};

const ModalContext = createContext<ModalContextType>(initialState);

export function ModalContextProvider({ children }: { children: ReactNode }) {
  const [isModalActive, setIsModalActive] = useState<ModalContextType['isModalActive']>(initialState.isModalActive);

  const closeModal = useCallback(() => {
    setIsModalActive(false);
    modals.closeAll();
  }, []);

  const openMenuModal = useCallback(
    (menuTabId?: MenuTabId) => {
      setIsModalActive(true);
      modals.open({
        title: 'Menu',
        size: 'lg',
        centered: true,
        children: <MenuTabs closeModal={closeModal} initialTab={menuTabId} />,
        zIndex: theme.layers.modalHeader,
        styles: {
          content: {},
          header: {
            borderBottom: '1px solid var(--color-borderPrimary)',
          },
          body: {
            padding: 0,
          },
        },
        onClose: closeModal,
      });
    },
    [closeModal]
  );

  const value = useMemo(
    () => ({
      isModalActive,
      openMenuModal,
      closeModal,
    }),
    [isModalActive, openMenuModal, closeModal]
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export default function useModalContext() {
  return useContext(ModalContext);
}
