import { dripStitches } from '../../../theme'; //TODO replace with absolute path
import { Flex, Grid } from '../../layout';

const { styled } = dripStitches;

export const StyledButtonSpinnerBox = styled(Flex, {
  alignItems: 'center',
  fontSize: '$md',
  lineHeight: 'normal',
});

export const StyledButtonSpinnerDotsBox = styled(Grid, {
  gap: '$1',
  gridAutoFlow: 'column',
  width: '100%',
  height: '100%',
});

export const StyledButtonSpinnerDot = styled('div', {
  all: 'unset',
  width: '$2',
  height: '$2',
  borderRadius: '$full',
  backgroundColor: '$slate1',
  opacity: 0.2,
});

export interface ButtonSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  spacing?: string;
  placement?: 'start' | 'end';
}
