import { dripStitches } from '../../../theme'; //TODO replace with absolute path
import { Flex, Grid } from '../../layout';

const { styled } = dripStitches;

export const StyledButtonContentGrid = styled(Grid, {
  gap: '$0h',
});

export const StyledButtonContentFlex = styled(Flex, {
  alignItems: 'center',
});
