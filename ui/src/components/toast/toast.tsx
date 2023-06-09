import { useCallback, useState } from 'react';

import {
  toastsActions,
  ToastsState,
  useAppDispatch,
  useToastsState,
} from '@/store';

import { Icon } from '../core';
import { DismissTimeout, ToastStyles } from './toast.styles';

type ToastProps = ToastsState.Toast;

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  message,
  onDismiss,
  duration = 3000,
}: ToastProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(true);

  const handleOpenChange = useCallback(
    (value: boolean) => {
      setOpen(value);
      if (!value) {
        if (onDismiss) onDismiss();
        setTimeout(() => {
          dispatch(toastsActions.dismiss(id));
        }, DismissTimeout);
      }
    },
    [onDismiss, dispatch, id]
  );

  return (
    <ToastStyles.Root
      open={open}
      duration={duration}
      variant={type}
      onOpenChange={handleOpenChange}
    >
      <ToastStyles.Layout>
        <ToastStyles.Content>
          <ToastStyles.Icon name={type} />
          <ToastStyles.Body>{message}</ToastStyles.Body>
        </ToastStyles.Content>
        <ToastStyles.Close asChild>
          <ToastStyles.CloseButton
            aria-label="close"
            colorScheme={type}
            variant="link"
            icon={<Icon name="close" />}
            onClick={onDismiss}
            css={{ p: '0' }}
          />
        </ToastStyles.Close>
      </ToastStyles.Layout>
    </ToastStyles.Root>
  );
};

export const ToastProvider: React.FC = () => {
  const { toasts } = useToastsState();

  return (
    <ToastStyles.Provider duration={3000} swipeDirection="down">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
      <ToastStyles.Viewport />
    </ToastStyles.Provider>
  );
};
