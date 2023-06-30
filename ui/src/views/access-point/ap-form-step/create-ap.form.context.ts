import { useState } from 'react';

import { FormField, useFormField } from '@/components';
import { createContext, StringValidators } from '@/utils';

export type CreateAccessPointFormContext = {
  form: {
    targetDomain: FormField;
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
      targetDomain: useFormField('targetDomain', [
        StringValidators.required,
        StringValidators.isValidDomain,
      ]),
      isValid: useState(false),
    },
  });
