import { Flex } from '@/components/layout';
import { styled } from '@/theme';

export const InputFileStyles = {
  Container: styled(Flex, {
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  }),
  Border: styled('div', {
    borderStyle: 'solid',
    borderColor: '$gray7',
    width: '$22',
    height: '$22',
    transition: 'border-color 0.2s ease-in-out',
    borderWidth: '$default',
    borderRadius: '$lg',

    '&:hover': {
      borderColor: '$gray8',
    },

    '&[aria-invalid=true], &[data-invalid]': {
      borderColor: '$red9',
    },
  }),
  Image: styled('img', {
    position: 'absolute',
    width: '3.5rem',
    height: '3.5rem',
  }),
  Input: styled('input', {
    all: 'unset',
    display: 'none',
  }),
};
