import { Flex, Icon } from '@/components';
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

  Flex: styled(Flex, {
    flex: 1,
    justifyContent: 'flex-end',
    gap: '$3h',

    '@media (max-width: 374px)': {
      flexWrap: 'wrap',
    },
  }),

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
      backgroundColor: '$slate7',
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
            backgroundColor: 'transparent',
          },
          false: {
            color: '$slate7 ',
            backgroundColor: 'black',
          },
        },
      },
    }),
  },
};
