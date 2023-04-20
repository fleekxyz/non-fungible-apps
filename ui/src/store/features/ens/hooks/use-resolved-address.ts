import { useEffect, useMemo } from 'react';

import { useAppDispatch } from '@/store/hooks';

import { ENSActions, useENSStore } from '../ens-slice';

export const useResolvedAddress = (address: string): [string, boolean] => {
  const { addressMap } = useENSStore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = addressMap[address] || {};
    if (typeof stored.state !== 'undefined') return;
    dispatch(ENSActions.resolveAddress(address));
  }, [address, dispatch, addressMap]);

  return useMemo(() => {
    const stored = addressMap[address] || {};
    return [stored.value || address, addressMap[address]?.state === 'loading'];
  }, [address, addressMap]);
};
