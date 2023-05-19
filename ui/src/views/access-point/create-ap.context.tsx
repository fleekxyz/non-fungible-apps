/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { Token } from '@/graphclient';
import { EthereumHooks } from '@/integrations';
import { AppLog, createContext } from '@/utils';

export type NFA = Pick<
  Token,
  'tokenId' | 'name' | 'logo' | 'color' | 'externalURL'
>;

export type AccessPointContext = {
  nfa: NFA;
  setNfa: (nfa: NFA) => void;
};

const [CreateAPProvider, useContext] = createContext<AccessPointContext>({
  name: 'CreateAPProvider.Context',
  hookName: 'CreateAPProvider.useContext',
  providerName: 'CreateAPProvider.Provider',
});

const [TransactionProvider, useTransactionContext] =
  EthereumHooks.createFleekAppsWriteContext('mint');

export abstract class CreateAccessPoint {
  static readonly useContext = useContext;

  static readonly useTransactionContext = useTransactionContext;

  static readonly Provider: React.FC<CreateAccessPoint.ProviderProps> = ({
    children,
  }) => {
    const [nfa, setNfa] = useState<NFA>({
      tokenId: '',
      name: '',
      logo: '',
      color: 0,
      externalURL: '',
    });

    return (
      <CreateAPProvider
        value={{
          nfa,
          setNfa,
        }}
      >
        <TransactionProvider
          config={{
            transaction: {
              onSuccess: (data) => {
                AppLog.info('Transaction:', data);
              },
              onError: (error) => {
                AppLog.errorToast(
                  'There was an error trying to mint the app. Please try again',
                  error
                );
              },
            },
          }}
        >
          {children}
        </TransactionProvider>
      </CreateAPProvider>
    );
  };
}

export namespace CreateAccessPoint {
  export type ProviderProps = {
    children: React.ReactNode;
  };
}
