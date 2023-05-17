import { Flex } from '@/components';
import { styled } from '@/theme';

export const TabsStyles = {
  Container: styled(Flex, {
    width: '100%',
  }),
  Tab: {
    Container: styled(Flex, {
      flexDirection: 'column',
      flex: 1,
      alignItems: 'center',
      cursor: 'pointer',

      variants: {
        active: {
          true: {
            color: 'white',
          },
          false: {
            color: '$slate8',
          },
        },
      },
    }),
    Label: styled('span', {
      padding: '$2h',
    }),
    Line: styled('span', {
      width: '100%',
      borderRadius: '3px',

      variants: {
        active: {
          true: {
            color: 'white',
            borderBottom: '3px solid white',
          },
          false: {
            color: '$slate8',
            borderBottom: '2px solid $slate8',
            mt: '0.046875rem',
          },
        },
      },
    }),
  },
};
