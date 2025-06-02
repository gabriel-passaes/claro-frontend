import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HistoryItem {
  id: string;
  email: string;
  loginAt: string;
  jwe: string;
}

interface HistoryState {
  recent: HistoryItem[];
  all: HistoryItem[];
}

const initialState: HistoryState = {
  recent: [],
  all: [],
};

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setRecentHistory(state, action: PayloadAction<HistoryItem[]>) {
      state.recent = action.payload;
    },
    setAllHistory(state, action: PayloadAction<HistoryItem[]>) {
      state.all = action.payload;
    },
  },
});

export const { setRecentHistory, setAllHistory } = historySlice.actions;
export default historySlice.reducer;
