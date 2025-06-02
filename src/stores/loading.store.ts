'use client';

import { LoadingState } from '@/components/Loading/loading.types';
import { create } from 'zustand';

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  type: 'spin',
  size: 'medium',
  color: 'primary',
  duration: 3000,

  startLoading: (props) =>
    set(() => ({
      isLoading: true,
      type: props.type ?? 'spin',
      size: props.size ?? 'medium',
      color: props.color ?? 'primary',
      duration: props.duration ?? 3000,
    })),

  stopLoading: () =>
    set(() => ({
      isLoading: false,
    })),
}));
