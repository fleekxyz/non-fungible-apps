import React from 'react';

import { styled } from '@/theme';

export const Flex = styled('div', {
  display: 'flex',
});

export type FlexProps = React.ComponentProps<typeof Flex>;
