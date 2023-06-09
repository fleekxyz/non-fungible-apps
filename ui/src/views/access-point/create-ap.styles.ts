import { Flex } from '@/components';
import { styled } from '@/theme';

export const CreateApStyles = {
  Container: styled(Flex, {
    height: '100%',
    flexDirection: 'column',
    minHeight: '85vh',
    alignItems: 'flex-start',

    '@md': {
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
};
