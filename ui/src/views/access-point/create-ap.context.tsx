import { EthereumHooks } from '@/integrations';
import { useFleekERC721Billing } from '@/store';
import { AppLog, createContext } from '@/utils';
import { useState } from 'react';

export type APContext = {
  billing: string | undefined;
  tokenId: number;
  appName: string;
  setTokenId: (id: number) => void;
  setAppName: (name: string) => void;
};

const [APProvider, useContext] = createContext<APContext>({
  name: 'AP.Context',
  hookName: 'AP.useContext',
  providerName: 'AP.Provider',
});

const [TransactionProvider, useTransactionContext] =
  EthereumHooks.createFleekERC721WriteContext('createAP');

export abstract class AP {
  static readonly useContext = useContext;

  static readonly useTransactionContext = useTransactionContext;

  static readonly Provider: React.FC<AP.ProviderProps> = ({ children }) => {
    const [billing] = useFleekERC721Billing('AddAccessPoint');
    const [tokenId, setTokenId] = useState<number>(0);
    const [appName, setAppName] = useState<string>('');

    const value = {
      billing,
      tokenId,
      appName,
      setTokenId,
      setAppName,
    };

    return (
      <APProvider value={value}>
        <TransactionProvider
          config={{
            transaction: {
              onSuccess: (data) => {
                AppLog.info('Transaction:', data);
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
