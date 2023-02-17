import { dripStitches } from '@/theme';

const { styled } = dripStitches;

export abstract class CardStyles {
  static readonly Container = styled('div', {
    backgroundColor: '$slate2',
    borderRadius: '$xlh',
    padding: '$7',
    borderStyle: 'solid',
    borderColor: '$slate6',
    borderWidth: '$default',
  });

  static readonly Heading = styled('h3', {
    color: '$slate12',
    fontSize: '$xl',
    fontWeight: '$medium',
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
