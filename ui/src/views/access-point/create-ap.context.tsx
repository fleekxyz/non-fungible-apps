import { ComboboxItem } from '@/components';
import { EthereumHooks } from '@/integrations';
import { useFleekERC721Billing } from '@/store';
import { AppLog, createContext, pushToast } from '@/utils';
import { useState } from 'react';

export type APContext = {
  billing: string | undefined;
  token: ComboboxItem;
  appName: string;
  setToken: (token: ComboboxItem) => void;
  setAppName: (name: string) => void;
};

const [APProvider, useContext] = createContext<APContext>({
  name: 'AP.Context',
  hookName: 'AP.useContext',
  providerName: 'AP.Provider',
});

const [TransactionProvider, useTransactionContext] =
  EthereumHooks.createFleekERC721WriteContext('addAccessPoint');

export abstract class AP {
  static readonly useContext = useContext;

  static readonly useTransactionContext = useTransactionContext;

  static readonly Provider: React.FC<AP.ProviderProps> = ({ children }) => {
    const [billing] = useFleekERC721Billing('AddAccessPoint');
    const [token, setToken] = useState<ComboboxItem>({} as ComboboxItem);
    const [appName, setAppName] = useState<string>('');

    const value = {
      billing,
      token,
      appName,
      setToken,
      setAppName,
    };

    return (
      <APProvider value={value}>
        <TransactionProvider
          config={{
            transaction: {
              onSuccess: (data) => {
                AppLog.info('Transaction:', data);
                pushToast('success', 'Your transaction was successful!');
              },
              onError: (error) => {
                AppLog.errorToast(error.message);
              },
            },
          }}
        >
          {children}
        </TransactionProvider>
      </APProvider>
    );
  };
}

export namespace AP {
  export type ProviderProps = {
    children: React.ReactNode;
  };
}
