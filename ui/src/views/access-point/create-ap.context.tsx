import { useState } from 'react';

import { EthereumHooks } from '@/integrations';
import { useFleekERC721Billing } from '@/store';
import { AppLog, createContext } from '@/utils';

export type NFA = {
  tokenId: string;
  name: string;
  logo: string;
  color: number;
};

export type AccessPointContext = {
  billing: string | undefined;
  nfa: NFA;
  setNfa: (nfa: NFA) => void;
};

const [CreateAPProvider, useContext] = createContext<AccessPointContext>({
  name: 'CreateAPProvider.Context',
  hookName: 'CreateAPProvider.useContext',
  providerName: 'CreateAPProvider.Provider',
});

const [TransactionProvider, useTransactionContext] =
  EthereumHooks.createFleekERC721WriteContext('addAccessPoint');

export abstract class CreateAccessPoint {
  static readonly useContext = useContext;

  static readonly useTransactionContext = useTransactionContext;

  static readonly Provider: React.FC<CreateAccessPoint.ProviderProps> = ({
    children,
  }) => {
    const [billing] = useFleekERC721Billing('AddAccessPoint');
    const [nfa, setNfa] = useState<NFA>({
      tokenId: '',
      name: '',
      logo: '',
      color: 0,
    });

    const value = {
      billing,
      nfa,
      setNfa,
    };

    return (
      <CreateAPProvider value={value}>
        <TransactionProvider
          config={{
            transaction: {
              onSuccess: (data: any) => {
                AppLog.info('Transaction:', data);
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onError: (error: any) => {
                AppLog.errorToast(
                  'There was an error trying to create the Access Point. Please try again'
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
