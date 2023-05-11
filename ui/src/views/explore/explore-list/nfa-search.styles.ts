import { Flex, Icon, IconButton } from '@/components';
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
    }),
    Icon: styled(Icon, {
      fontSize: '$lg',
    }),
  },
  GridList: {
    Wrapper: styled(Flex, {
      border: '1px solid $slate7',
      borderRadius: '$lg',
    }),
    Icon: styled(Icon, {
      p: '$2 $3',
      border: 'none',
      borderRadius: '$lg',
      cursor: 'pointer',

      variants: {
        selected: {
          true: {
            color: 'white',
            backgroundColor: '$slate7',
          },
          false: {
            color: '$slate7 ',
            backgroundColor: 'transparent',
          },
        },
      },
    }),
  },
};
