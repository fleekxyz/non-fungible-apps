import { Flex } from '@/components';
import { styled } from '@/theme';

export abstract class ExploreHeaderStyles {
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
