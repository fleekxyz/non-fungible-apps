/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

import { FormField, useFormField } from '@/components';
import { Token } from '@/graphclient';
import { EthereumHooks } from '@/integrations';
import { AppLog, createContext, StringValidators } from '@/utils';

const [CreateAPProvider, useContext] = createContext<CreateAccessPoint.Context>(
  {
    name: 'CreateAPProvider.Context',
    hookName: 'CreateAPProvider.useContext',
    providerName: 'CreateAPProvider.Provider',
  }
);

const [TransactionProvider, useTransactionContext] =
  EthereumHooks.createFleekAppsWriteContext('mint');

const [FormProvider, useFormContext] =
  createContext<CreateAccessPoint.FormContext>({
    name: 'MintFormContext',
    hookName: 'useMintFormContext',
    providerName: 'MintFormProvider',
  });

export abstract class CreateAccessPoint {
  static readonly useContext = useContext;

  static readonly useTransactionContext = useTransactionContext;

  static readonly useFormContext = useFormContext;

  static readonly Provider: React.FC<CreateAccessPoint.ProviderProps> = ({
    children,
  }) => {
    const [nfa, setNfa] = useState<CreateAccessPoint.NFA>({
      tokenId: '0',
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
          <FormProvider
            value={{
              form: {
                domain: useFormField('domain', [
                  StringValidators.isValidDomain,
                ]),
                isValid: useState(false),
              },
            }}
          >
            {children}
          </FormProvider>
        </TransactionProvider>
      </CreateAPProvider>
    );
  };
}

export namespace CreateAccessPoint {
  export type ProviderProps = {
    children: React.ReactNode;
  };

  export type NFA = Pick<
    Token,
    'tokenId' | 'name' | 'logo' | 'color' | 'externalURL'
  >;

  export type Context = {
    nfa: NFA;
    setNfa: (nfa: NFA) => void;
  };

  export type FormContext = {
    form: {
      domain: FormField;
      isValid: ReactState<boolean>;
    };
  };
}
