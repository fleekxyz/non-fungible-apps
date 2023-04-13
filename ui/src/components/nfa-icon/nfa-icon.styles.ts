import { styled } from '@/theme';
import { Image } from '../core';

export const NFAIconStyles = {
  Container: styled('span', {
    p: '$1h',
    borderRadius: '$full',
    width: '$7',
    height: '$7',
    mr: '$2',
  }),
  Image: styled(Image, {
    width: '100%',
    height: '100%',
  }),
};
