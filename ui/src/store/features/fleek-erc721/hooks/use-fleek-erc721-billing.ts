import { useEffect } from 'react';

import { useAppDispatch } from '@/store/hooks';

import {
  fleekERC721Actions,
  FleekERC721State,
  useFleekERC721Store,
} from '../fleek-erc721-slice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useFleekERC721Billing = (key: FleekERC721State.BillingKeys) => {
  const { billing, billingState } = useFleekERC721Store();
  const dispatch = useAppDispatch();

  const refresh = (): void => {
    dispatch(fleekERC721Actions.fetchBilling(key));
  };

  useEffect(() => {
    if (typeof billingState[key] !== 'undefined') return;

    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [billing[key], billingState[key], refresh] as const;
};
