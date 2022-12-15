import { useToast, UseToastOptions } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type ToastState = {
  title: string;
  description: string;
  status: UseToastOptions['status'];
  duration?: number;
  position?: UseToastOptions['position'];
};

export const useToastHook = () => {
  const [toastInfo, setToastInfo] = useState<ToastState>();
  const toast = useToast();

  useEffect(() => {
    if (toastInfo) {
      const {
        title,
        description,
        status,
        duration = 3000,
        position = 'bottom',
      } = toastInfo;

      toast({
        title,
        description,
        status,
        duration,
        position,
        isClosable: true,
      });
    }
  }, [toastInfo, toast]);

  return { setToastInfo };
};

