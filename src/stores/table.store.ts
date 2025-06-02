import { create } from 'zustand';

type TableState = {
  selectedRow: number | null;
  setSelectedRow: (index: number | null) => void;
};

export const useTableStore = create<TableState>((set) => ({
  selectedRow: null,
  setSelectedRow: (index) => set({ selectedRow: index }),
}));
