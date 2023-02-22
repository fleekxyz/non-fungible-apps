import {
  Address,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  UsePrepareContractWriteConfig,
} from 'wagmi';
import type { Abi as AbiType } from 'abitype';
import { FleekERC721 } from '../contracts';
import { createContext } from '@/utils';
import { useState } from 'react';

const createWriteContractContext = <
  TAbi extends EthereumHooks.Abi,
  TArgumentsMap extends EthereumHooks.WriteContext.ArgumentsMap,
  TFunctionName extends keyof TArgumentsMap & string,
  TFunctionArguments extends TArgumentsMap[TFunctionName]
>(
  address: string,
  abi: TAbi,
  functionName: TFunctionName,
  name = `WriteContractContext[${functionName}]`,
  hookName = `[${functionName}] write contract hook`,
  providerName = `Write contract [${functionName}] provider`
) => {
  const [InternalProvider, useInternalProvider] = createContext<
    EthereumHooks.WriteContext.InternalContextProps<
      TAbi,
      TArgumentsMap,
      TFunctionName,
      TFunctionArguments
    >
  >({
    name,
    hookName,
    providerName,
  });

  const Provider = ({
    children,
    config: {
      settings: settingsConfig = {},
      transaction: transactionConfig = {},
    } = {},
  }: EthereumHooks.WriteContext.ProviderProps<TFunctionName>) => {
    const [args, setArgs] = useState<TFunctionArguments>();

    const prepare = usePrepareContractWrite({
      address: address as Address,
      abi: abi as unknown[],
      functionName,
      args,
      ...settingsConfig,
    });

    const write = useContractWrite(prepare.config);

    const transaction = useWaitForTransaction({
      hash: write.data?.hash,
      ...transactionConfig,
    });

    const value = {
      functionName,
      prepare,
      write,
      transaction,
      setArgs,
    };

    return <InternalProvider value={value}>{children}</InternalProvider>;
  };

  return [Provider, useInternalProvider] as const;
};

export const EthereumHooks = {
  createFleekERC721WriteContext: <
    TFunctionName extends keyof ArgumentsMaps.FleekERC721 & string,
    TFunctionArguments extends ArgumentsMaps.FleekERC721[TFunctionName]
  >(
    functionName: TFunctionName
  ) => {
    return createWriteContractContext<
      typeof FleekERC721.abi,
      ArgumentsMaps.FleekERC721,
      TFunctionName,
      TFunctionArguments
    >(FleekERC721.address, FleekERC721.abi, functionName);
  },
};

export namespace EthereumHooks {
  export type Abi = AbiType | readonly unknown[];

  export namespace WriteContext {
    export type ArgumentsMap = Record<string, (string | number | boolean)[]>;

    export interface InternalContextProps<
      TAbi extends Abi,
      TArgumentsMap extends ArgumentsMap,
      TFunctionName extends keyof TArgumentsMap & string,
      TFunctionArguments extends TArgumentsMap[TFunctionName]
    > {
      functionName: TFunctionName;
      prepare: ReturnType<
        typeof usePrepareContractWrite<TAbi, TFunctionName, number>
      >;
      write: ReturnType<
        typeof useContractWrite<'prepared', TAbi, TFunctionName>
      >;
      transaction: ReturnType<typeof useWaitForTransaction>;
      setArgs: (args: TFunctionArguments) => void;
    }

    export interface ProviderConfig<TFunctionName extends string> {
      settings?: Omit<
        UsePrepareContractWriteConfig<any, TFunctionName>,
        'address' | 'abi' | 'functionName' | 'args'
      >;
      transaction?: Parameters<typeof useWaitForTransaction>[0];
    }

    export interface ProviderProps<TFunctionName extends string> {
      children?: React.ReactNode | React.ReactNode[];
      config?: ProviderConfig<TFunctionName>;
    }
  }
}

export namespace ArgumentsMaps {
  export interface FleekERC721 extends EthereumHooks.WriteContext.ArgumentsMap {
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
  }
}
