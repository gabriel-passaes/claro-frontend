'use client';

import { create } from 'zustand';

type InputField = {
  value: string;
  errorMessage: string;
};

type InputStore = {
  inputs: Record<string, InputField>;
  setValue: (name: string, value: string) => void;
  setError: (name: string, errorMessage: string) => void;
  initField: (name: string) => void;
};

export const useInputStore = create<InputStore>((set) => ({
  inputs: {},
  setValue: (name, value) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        [name]: {
          ...(state.inputs[name] || { value: '', errorMessage: '' }),
          value,
        },
      },
    })),
  setError: (name, errorMessage) =>
    set((state) => ({
      inputs: {
        ...state.inputs,
        [name]: {
          ...(state.inputs[name] || { value: '', errorMessage: '' }),
          errorMessage,
        },
      },
    })),
  initField: (name) =>
    set((state) => {
      if (!state.inputs[name]) {
        return {
          inputs: {
            ...state.inputs,
            [name]: { value: '', errorMessage: '' },
          },
        };
      }
      return state;
    }),
}));

export const useInputField = (name: string) => {
  const value = useInputStore((state) => state.inputs[name]?.value || '');
  const errorMessage = useInputStore(
    (state) => state.inputs[name]?.errorMessage || '',
  );
  const setValue = (val: string) =>
    useInputStore.getState().setValue(name, val);
  const setError = (err: string) =>
    useInputStore.getState().setError(name, err);

  return { value, errorMessage, setValue, setError };
};
