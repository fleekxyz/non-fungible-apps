import { useMemo } from 'react';

import { useResolvedAddress } from '@/store';
import { forwardStyledRef } from '@/theme';

import { ResolvedAddressStyles as RAS } from './resolved-address.styles';

export type ResolvedAddressProps = React.ComponentPropsWithRef<
  typeof RAS.Container
> & {
  children: string;
  truncated?: boolean;
};

export const ResolvedAddress = forwardStyledRef<
  HTMLSpanElement,
  ResolvedAddressProps
>(({ children, truncated = false, ...props }, ref) => {
  const [resolvedAddress, loading] = useResolvedAddress(children);

  const text = useMemo(() => {
    if (!resolvedAddress.endsWith('.eth') && truncated)
      return `${resolvedAddress.slice(0, 6)}...${resolvedAddress.slice(-4)}`;
    return resolvedAddress;
  }, [resolvedAddress, truncated]);

  return (
    <RAS.Container {...props} ref={ref} data-loading={loading}>
      {text}
    </RAS.Container>
  );
});
