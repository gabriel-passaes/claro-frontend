import { create } from 'zustand';

interface SidebarState {
  visible: boolean;
  toggle: () => void;
  show: () => void;
  hide: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  visible: false,
  toggle: () => set((state) => ({ visible: !state.visible })),
  show: () => set({ visible: true }),
  hide: () => set({ visible: false }),
}));
