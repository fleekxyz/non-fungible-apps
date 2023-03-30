import { FormField, useFormField } from '@/components';
import { createContext, StringValidators } from '@/utils';
import { useState } from 'react';

export type CreateAccessPointFormContext = {
  form: {
    appName: FormField;
    isValid: ReactState<boolean>;
  };
};

export const [CreateAccessPointFormProvider, useAccessPointFormContext] =
  createContext<CreateAccessPointFormContext>({
    name: 'MintFormContext',
    hookName: 'useMintFormContext',
    providerName: 'MintFormProvider',
  });

export const useAccessPointFormContextInit =
  (): CreateAccessPointFormContext => ({
    form: {
      appName: useFormField('appName', [
        StringValidators.required,
        StringValidators.maxLength(50),
      ]),
      isValid: useState(false),
    },
  });
