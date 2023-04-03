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

/**
 * This is a factory to create context factories for contracts write.
 * It should be used inside other context factories specific for each
 * contract.
 */
const createWriteContractContext = <
  TAbi extends EthereumHooks.Abi,
  TArgumentsMap extends EthereumHooks.WriteContext.ArgumentsMap,
  TFunctionName extends keyof TArgumentsMap & string,
  TFunctionArguments extends [
    ...TArgumentsMap[TFunctionName],
    EthereumHooks.WriteContext.SettingsParam
  ]
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
      prepare: prepareConfig = {},
      transaction: transactionConfig = {},
      write: writeConfig = {},
    } = {},
  }: EthereumHooks.WriteContext.ProviderProps<TFunctionName>) => {
    const [args, setArgs] = useState<TFunctionArguments>();

    const prepare = usePrepareContractWrite({
      address: address as Address,
      abi: abi as unknown[],
      functionName,
      args,
      ...prepareConfig,
    });

    const write = useContractWrite({ ...prepare.config, ...writeConfig });

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

/**
 * React hooks and related to interact with Ethereum.
 */
export const EthereumHooks = {
  /**
   * Context factory for FleekERC721 write functions.
   */
  createFleekERC721WriteContext: <
    TFunctionName extends keyof ArgumentsMaps.FleekERC721 & string,
    TFunctionArguments extends [
      ...ArgumentsMaps.FleekERC721[TFunctionName],
      EthereumHooks.WriteContext.SettingsParam
    ]
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

/**
 * EthereumHooks used typings.
 */
export namespace EthereumHooks {
  export type Abi = AbiType | readonly unknown[];

  export namespace WriteContext {
    export type ArgumentsMap = Record<string, (string | number | boolean)[]>;

    export interface InternalContextProps<
      TAbi extends Abi,
      TArgumentsMap extends ArgumentsMap,
      TFunctionName extends keyof TArgumentsMap & string,
      TFunctionArguments extends [
        ...TArgumentsMap[TFunctionName],
        EthereumHooks.WriteContext.SettingsParam
      ]
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
      prepare?: Omit<
        UsePrepareContractWriteConfig<any, TFunctionName>,
        'address' | 'abi' | 'functionName' | 'args'
      >;
      write?: Omit<
        Exclude<Parameters<typeof useContractWrite>[0], undefined>,
        'mode' | 'address' | 'abi' | 'functionName' | 'args'
      >;
      transaction?: Omit<
        Exclude<Parameters<typeof useWaitForTransaction>[0], undefined>,
        'hash'
      >;
    }

    export interface ProviderProps<TFunctionName extends string> {
      children?: React.ReactNode | React.ReactNode[];
      config?: ProviderConfig<TFunctionName>;
    }

    export type SettingsParam = { value?: string };
  }
}

/**
 * Identified types to interact with known contracts using EthereumHooks contexts.
 */
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
      boolean, // bool accessPointAutoApproval
      string //verifier address
    ];

    addAccessPoint: [
      number, // tokenId
      string // access point DNS
    ];

    /**
     * TODO: Add other functions arguments as they are needed.
     */
  }
}
