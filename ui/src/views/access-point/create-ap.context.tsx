/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { FormField, useFormField } from '@/components';
import { Token } from '@/graphclient';
import { getNFADocument } from '@/graphclient';
import { EthereumHooks } from '@/integrations';
import { AppLog, createContext, StringValidators } from '@/utils';

import UniswapNFAMock from './uniswap-nfa.mock.json';

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
    const { id } = useParams();
    const [nfa, setNfa] = useState<CreateAccessPoint.NFA>(
      UniswapNFAMock as any // TODO: remove mock
    );

    const { loading: nfaLoading } = useQuery(getNFADocument, {
      skip: id === undefined || Boolean(UniswapNFAMock), // TODO: remove mock
      variables: {
        id: ethers.utils.hexlify(Number(id)),
      },
      onCompleted(data) {
        if (data.token && id) {
          const { name, tokenId, logo, color, externalURL } = data.token;
          setNfa({ name, tokenId, logo, color, externalURL });
        } else {
          AppLog.errorToast("We couldn't find the NFA you are looking for");
        }
      },
      onError(error) {
        AppLog.errorToast('Error fetching NFA', error);
      },
    });

    return (
      <CreateAPProvider
        value={{
          nfa,
          isLoading: nfaLoading,
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
    isLoading: boolean;
  };

  export type FormContext = {
    form: {
      domain: FormField;
      isValid: ReactState<boolean>;
    };
  };
}
