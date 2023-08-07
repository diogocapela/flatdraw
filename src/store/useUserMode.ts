import { create } from 'zustand';

import type { UserMode } from '~/config/types';

const useUserMode = create<{
  userMode: UserMode;
  setUserMode: (userMode: UserMode) => void;
}>((set) => ({
  userMode: 'select',
  setUserMode: (userMode: UserMode) => set(() => ({ userMode })),
}));

export default useUserMode;
