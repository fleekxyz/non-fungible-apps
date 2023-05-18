import { styled } from '@/theme';

export abstract class CardStyles {
  static readonly Container = styled('div', {
    width: '$full',
    height: 'fit-content',
    backgroundColor: '$slate2',
    borderRadius: '$xlh',
    padding: '$7',
    borderStyle: 'solid',
    borderColor: '$slate6',
    borderWidth: '$default',
  });

  static readonly Header = styled('div', {
    width: '$full',
  });

  static readonly Body = styled('div', {
    pt: '$5',
  });

  static readonly Text = styled('div', {
    backgroundColor: '$slate1',
    width: '$full',
    borderRadius: '$xl',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '$slate8',
    fontSize: '$sm',
  });
}
