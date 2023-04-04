import React from 'react';

import { dripStitches } from '../../theme'; //TODO replace with absolute path

const { styled } = dripStitches;

export const Flex = styled('div', {
  display: 'flex',
});

export type FlexProps = React.ComponentProps<typeof Flex>;
