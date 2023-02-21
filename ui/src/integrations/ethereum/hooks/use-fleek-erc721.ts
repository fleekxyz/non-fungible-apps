import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { FleekERC721 } from '../contracts';

const { address, abi } = FleekERC721;

export const useFleekERC721 = <
  F extends keyof FleekERC721Arguments,
  A extends FleekERC721Arguments[F]
>(
  functionName: F,
  args: A
) => {
  const settings = usePrepareContractWrite({
    address: address as Address,
    abi,
    functionName,
    args,
  });

  const action = useContractWrite(settings.config);

  const transaction = useWaitForTransaction({
    hash: action.data?.hash,
  });

  return {
    settings,
    [functionName]: action,
    transaction,
  };
};

export type FleekERC721Arguments = {
  mint: [];
};
