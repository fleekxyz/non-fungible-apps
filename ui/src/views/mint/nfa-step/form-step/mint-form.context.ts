import { useState } from 'react';

import { FormField, useFormField } from '@/components';
import { createContext, StringValidators } from '@/utils';

export type MintFormContext = {
  form: {
    gitBranch: FormField;
    gitCommit: FormField;
    appName: FormField;
    appDescription: FormField;
    appLogo: FormField;
    logoColor: FormField;
    ens: FormField;
    domainURL: FormField;
    verifier: FormField;
    isValid: ReactState<boolean>;
  };
};

export const [MintFormProvider, useMintFormContext] =
  createContext<MintFormContext>({
    name: 'MintFormContext',
    hookName: 'useMintFormContext',
    providerName: 'MintFormProvider',
  });

export const useMintFormContextInit = (): MintFormContext => ({
  form: {
    gitBranch: useFormField('gitBranch', [StringValidators.required]),
    gitCommit: useFormField('gitCommit', [StringValidators.required]),
    appName: useFormField('appName', [
      StringValidators.required,
      StringValidators.maxLength(50),
    ]),
    appDescription: useFormField('appDescription', [
      StringValidators.required,
      StringValidators.maxLength(250),
      StringValidators.hasSpecialCharacters,
    ]),
    appLogo: useFormField('appLogo', [
      StringValidators.maxFileSize(10), // in KB
      StringValidators.required,
    ]),
    logoColor: useFormField(
      'logoColor',
      [StringValidators.required],
      '#000000'
    ),
    domainURL: useFormField('domainURL', [
      StringValidators.required,
      StringValidators.isUrl,
    ]),
    ens: useFormField('ens', [], ''),
    verifier: useFormField('verifier', [StringValidators.required]),
    isValid: useState(false),
  },
});
