import { useState } from 'react';

import { ComboboxItem } from '@/components';
import { EthereumHooks } from '@/integrations';
import { useFleekERC721Billing } from '@/store';
import { AppLog, createContext, pushToast } from '@/utils';

export type AccessPointContext = {
  billing: string | undefined;
  nfa: ComboboxItem;
  setNfa: (nfa: ComboboxItem) => void;
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
    const [nfa, setNfa] = useState<ComboboxItem>({} as ComboboxItem);

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
              onSuccess: (data) => {
                AppLog.info('Transaction:', data);
                pushToast('success', 'Your transaction was successful!');
              },
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onError: (error) => {
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
