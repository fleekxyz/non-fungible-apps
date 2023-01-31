import { dripStitches } from '../../theme'; //TODO replace with absolute path
import React from 'react';

const { styled } = dripStitches;

export const Flex = styled('div', {
  display: 'flex',
});

export type FlexProps = React.ComponentProps<typeof Flex>;
