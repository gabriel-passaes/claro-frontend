'use client';

import type { LoadingProps } from '@/components/Loading/loading.types';
import { create } from 'zustand';

interface LoadingStore extends LoadingProps {
  isLoading: boolean;
  startLoading: (props: LoadingProps) => void;
  stopLoading: () => void;
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  isLoading: false,
  type: 'spin',
  size: 'medium',
  color: 'primary',

  startLoading: (props) =>
    set(() => ({
      isLoading: true,
      type: props.type ?? 'spin',
      size: props.size ?? 'medium',
      color: props.color ?? 'primary',
    })),

  stopLoading: () =>
    set(() => ({
      isLoading: false,
    })),
}));
