import { Flex } from '@/components';
import { styled } from '@/theme';

export abstract class Explore {
  static readonly Container = styled(Flex, {
    flexDirection: 'column',
    width: '63.4rem', //TODO replace for max-width
    margin: '0 auto',
  });
}
