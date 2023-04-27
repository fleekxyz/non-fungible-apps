import { Flex } from '@/components/layout';
import { styled } from '@/theme';

export abstract class InputFileStyles {
  static readonly Container = styled(Flex, {
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  });

  static readonly Border = styled('div', {
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
  });
}
