import { styled } from '@/theme';

export abstract class PageStyles {
  public static readonly Container = styled('div', {
    minHeight: '100vh',
    position: 'relative',
  });

  public static readonly Content = styled('div', {
    width: '100%',
    minHeight: '85vh',
    maxWidth: '$6xl',
    padding: '$6',
    margin: '0 auto',

    '@md': {
      padding: '0 $6',
    },
  });
}
