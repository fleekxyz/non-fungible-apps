import { useToast as useToastChakra } from '@chakra-ui/react';

export const useToast = () => {
  return useToastChakra({
    duration: 3000,
    isClosable: true,
  });
};
