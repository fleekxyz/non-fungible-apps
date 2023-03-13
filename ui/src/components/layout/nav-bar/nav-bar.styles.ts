import { dripStitches } from '@/theme';

const { styled } = dripStitches;
export abstract class NavBarStyles {
  static readonly Container = styled('header', {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
  });

  static readonly Content = styled('div', {
    display: 'flex',
    width: '100%',
    maxWidth: '1280px',
    margin: 'auto',
    alignItems: 'center',
    padding: '$5',
  });
}
