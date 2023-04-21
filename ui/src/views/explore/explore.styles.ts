import { Flex } from '@/components';
import { styled } from '@/theme';

export abstract class Explore {
  static readonly Container = styled(Flex, {
    flexDirection: 'column',
  });
}
