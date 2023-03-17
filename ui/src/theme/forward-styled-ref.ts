import { StyledComponent } from '@stitches/react/types/styled-component';
import { forwardRef, ForwardRefRenderFunction } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export const forwardStyledRef = <T, P = {}>(
  render: ForwardRefRenderFunction<T, P>
): StyledComponent<T, P> => forwardRef<T, P>(render) as StyledComponent<T, P>;
