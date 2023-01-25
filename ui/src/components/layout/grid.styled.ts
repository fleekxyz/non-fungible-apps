import { dripStitches } from '../../theme'; //TODO replace with absolute path

const { styled } = dripStitches;

export const Grid = styled('div', {
  display: 'grid',
});

export type GridProps = React.ComponentProps<typeof Grid>;
