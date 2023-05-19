import { Flex } from '@/components';
import { styled } from '@/theme';

export const ColorPickerStyles = {
  Container: styled('div', {
    position: 'relative',

    [`${Flex}`]: {
      gap: '$3h',
      alignItems: 'center',
    },
  }),
  Input: styled('input', {
    position: 'absolute',
    right: '4rem',
    height: '1.25rem',
  }),
  Image: styled('img', {
    display: 'none',
  }),
};
