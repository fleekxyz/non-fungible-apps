import { Flex } from '@/components';
import { styled } from '@/theme';

export const RepositoiresListStyles = {
  Container: styled(Flex, {
    height: '$60',
    overflowX: 'hidden',
    overflowY: 'scroll',
    flexDirection: 'column',
    pr: '$3h',
  }),
  Message: styled('div', {
    position: 'relative',
    cursor: 'default',
    userSelect: 'none',
    p: '$2 $3h $4 $3h',
    color: '$slate11',
    textAlign: 'center',
  }),
};
