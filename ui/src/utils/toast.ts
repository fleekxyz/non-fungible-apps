import { store, toastsActions, ToastsState } from '@/store';

type PushToast = (
  type: ToastsState.Toast['type'],
  message: ToastsState.Toast['message'],
  extra?: Omit<ToastsState.Toast, 'id' | 'type' | 'message' | 'children'>
) => void;

export const pushToast: PushToast = (type, message, extra = {}) =>
  store.dispatch(toastsActions.push({ type, message, ...extra }));
