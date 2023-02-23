import { useFeeData, useNetwork } from 'wagmi';
import { ethers } from 'ethers';
import { useMemo } from 'react';

export const useTransactionCost = (
  value = ethers.BigNumber.from(0),
  gasLimit = ethers.BigNumber.from(0)
): [ethers.BigNumber, string, boolean] => {
  const { data: feeData } = useFeeData();
  const { chain } = useNetwork();

  return useMemo(() => {
    if (!feeData || !feeData.gasPrice || !chain)
      return [ethers.BigNumber.from(0), '', true];

    console.log('gasLimit', gasLimit);
    console.log('feeData.gasPrice', feeData.gasPrice);

    return [
      gasLimit.mul(feeData.gasPrice).add(value),
      chain.nativeCurrency.symbol,
      false,
    ];
  }, [feeData, chain, value, gasLimit]);
};
