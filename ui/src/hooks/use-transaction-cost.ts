import { ethers } from 'ethers';
import { useMemo } from 'react';
import { useFeeData, useNetwork } from 'wagmi';

export const useTransactionCost = (
  value = ethers.BigNumber.from(0),
  gasLimit = ethers.BigNumber.from(0)
): [ethers.BigNumber, string, boolean] => {
  const { data: feeData } = useFeeData();
  const { chain } = useNetwork();

  return useMemo(() => {
    if (!feeData || !feeData.gasPrice || !chain)
      return [ethers.BigNumber.from(0), '', true];

    return [
      gasLimit.mul(feeData.gasPrice).add(value),
      chain.nativeCurrency.symbol,
      false,
    ];
  }, [feeData, chain, value, gasLimit]);
};
