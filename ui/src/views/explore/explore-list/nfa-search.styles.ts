import { Flex } from '@/components';
import { styled } from '@/theme';

export const NFASearchFragmentStyles = {
  Container: styled(Flex, {
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '$3',
  }),

  Data: {
    Wrapper: styled('div', {
      fontSize: '$xl',
      fontWeight: '$bold',
      display: 'flex',
      alignItems: 'center',
    }),

    Text: styled('span', {
      color: '$slate12',
    }),

    Number: styled('span', {
      color: '$slate11',
    }),
  },

  Input: {
    Wrapper: styled(Flex, {
      gap: '$3',
      width: '100%',
      maxWidth: '30rem',
      justifySelf: 'center',

      button: {
        minWidth: '$28',
      },
    }),
  },
};
