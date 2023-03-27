import { Flex } from '@/components';
import { dripStitches } from '@/theme';

const { styled } = dripStitches;

export abstract class Header {
  static readonly Container = styled(Flex, {
    flexDirection: 'column',
    gap: '$6',
    my: '$16',
  });

  static readonly Text = styled('h2', {
    fontSize: '$4xl',
    maxWidth: '46rem',
  });

  static readonly GrayText = styled('span', {
    color: '$slate11',
  });

  static readonly WhiteText = styled('span', {
    color: '$slate12',
  });

  static readonly ButtonContainer = styled(Flex, {
    gap: '$3',
  });
}
