import { styled } from '@/theme';

import { Flex } from '../layout';

export abstract class LogoStyles {
  static readonly Container = styled(Flex, {
    cursor: 'pointer',
    flex: 1,
  });

  static readonly Logo = styled('img', {
    width: '$6',
    height: 'auto',
  });
}
