import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';

export namespace ToastsState {
  export type Toast = {
    id: number;
    type: 'success' | 'error';
    message: string;
    onDismiss?: () => void;
    duration?: number;
  };
}

interface ToastsState {
  toasts: ToastsState.Toast[];
}

const initialState: ToastsState = {
  toasts: [],
};

export const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    push: (state, action: PayloadAction<Omit<ToastsState.Toast, 'id'>>) => {
      state.toasts = [...state.toasts, { ...action.payload, id: Date.now() }];
    },
    dismiss: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter(
        (toast) => toast.id !== action.payload
      );
    },
  },
});

export const toastsActions = { ...toastsSlice.actions };

const selectToastsState = (state: RootState): ToastsState => state.toasts;

export const useToastsState = (): ToastsState =>
  useAppSelector(selectToastsState);

export default toastsSlice.reducer;
