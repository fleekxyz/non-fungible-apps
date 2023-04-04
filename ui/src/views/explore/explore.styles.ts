import { Flex } from '@/components';
import { dripStitches } from '@/theme';

const { styled } = dripStitches;

export abstract class Explore {
  static readonly Container = styled(Flex, {
    flexDirection: 'column',
    width: '64.75rem', //TODO replace for max-width
    margin: '0 auto',
  });
}
