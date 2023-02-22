import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  UsePrepareContractWriteConfig,
} from 'wagmi';
import { FleekERC721 } from '../contracts';

const { address, abi } = FleekERC721;

interface UseWriteSettings<A extends any[], F extends string> {
  settings?: Omit<
    UsePrepareContractWriteConfig<A, F>,
    'address' | 'abi' | 'functionName' | 'args'
  >;
  transaction?: Parameters<typeof useWaitForTransaction>[0];
}

export const useFleekERC721 = <
  F extends keyof FleekERC721Arguments,
  A extends FleekERC721Arguments[F]
>(
  functionName: F,
  args: A,
  {
    settings: settingsConfig = {},
    transaction: transactionConfig = {},
  }: UseWriteSettings<typeof abi, F> = {}
) => {
  const prepare = usePrepareContractWrite({
    address: address as Address,
    abi,
    functionName,
    args,
    ...settingsConfig,
  });

  const write = useContractWrite(prepare.config);

  const transaction = useWaitForTransaction({
    hash: write.data?.hash,
    ...transactionConfig,
  });

  return {
    prepare,
    write,
    transaction,
  };
};

export type FleekERC721Arguments = {
  mint: [
    string, // address to
    string, // string name
    string, // string description
    string, // string externalURL
    string, // string ENS
    string, // string commitHash
    string, // string gitRepository
    string, // string logo
    number, // uint24 color
    boolean // bool accessPointAutoApproval
  ];
};
