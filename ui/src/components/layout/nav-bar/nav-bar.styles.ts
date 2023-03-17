import { dripStitches } from '@/theme';
import { Flex } from '../flex.styles';

const { styled } = dripStitches;
export abstract class NavBarStyles {
  static readonly Container = styled('header', {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'black',
    zIndex: '$sticky',
    height: '$22',
  });

  static readonly Content = styled('div', {
    display: 'flex',
    width: '100%',
    maxWidth: '$7xl',
    margin: '0 auto',
    alignItems: 'center',
    padding: '$6',
  });

  static readonly Navigation = styled(Flex, {
    gap: '$10',
  });
}