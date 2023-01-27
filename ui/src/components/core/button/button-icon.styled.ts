import { dripStitches } from '../../../theme'; //TODO replace with absolute path

const { styled } = dripStitches;

export const StyledButtonIconSpan = styled('span', {
  all: 'unset',
  display: 'inline-flex',
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1.3,
  flexShrink: 0,
});

export type ButtonIconSpanProps = React.ComponentProps<
  typeof StyledButtonIconSpan
>;
