import { create } from 'zustand';

type ModalSize = 'small' | 'medium' | 'large' | 'extra' | 'full';
type ModalType = 'vertical' | 'horizontal';

interface ModalState {
  isOpen: boolean;
  size: ModalSize;
  type: ModalType;
  openModal: (size?: ModalSize, type?: ModalType) => void;
  closeModal: () => void;
  toggleModal: (size?: ModalSize, type?: ModalType) => void;
  resetModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  size: 'medium',
  type: 'vertical',

  openModal: (size = 'medium', type = 'vertical') =>
    set({ isOpen: true, size, type }),

  closeModal: () => set({ isOpen: false }),

  toggleModal: (size = 'medium', type = 'vertical') =>
    set((state) => ({
      isOpen: !state.isOpen,
      size: !state.isOpen ? size : state.size,
      type: !state.isOpen ? type : state.type,
    })),

  resetModal: () => set({ isOpen: false, size: 'medium', type: 'vertical' }),
}));
