import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth.store';
import historyReducer from './history.store';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    history: historyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
