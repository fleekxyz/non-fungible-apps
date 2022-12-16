import { useToast as useToastChakra, UseToastOptions } from '@chakra-ui/react';
import { useCallback } from 'react';

export const useToast = () => {
  const toast = useToastChakra();
  return useCallback(
    ({
      duration = 3000,
      position = 'buttom' as UseToastOptions['position'],
      isClosable = true,
      ...params
    }: UseToastOptions) =>
      toast({
        duration,
        position: position as UseToastOptions['position'],
        isClosable,
        ...params,
      }) as unknown as typeof toast,
    []
  );
};

