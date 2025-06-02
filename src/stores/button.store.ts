import { create } from 'zustand';

interface ButtonClick {
  label: string;
  timestamp: number;
}

interface ButtonStore {
  clickedButtons: ButtonClick[];
  addClick: (label: string) => void;
  clearClicks: () => void;
  removeClick: (label: string) => void;
}

export const useButtonStore = create<ButtonStore>((set) => ({
  clickedButtons: [],
  addClick: (label) =>
    set((state) => {
      const exists = state.clickedButtons.some((btn) => btn.label === label);
      if (exists) return state;
      const newClick = { label, timestamp: Date.now() };
      const updated = [...state.clickedButtons, newClick].slice(-100);
      return { clickedButtons: updated };
    }),
  clearClicks: () => set({ clickedButtons: [] }),
  removeClick: (label) =>
    set((state) => ({
      clickedButtons: state.clickedButtons.filter((btn) => btn.label !== label),
    })),
}));
