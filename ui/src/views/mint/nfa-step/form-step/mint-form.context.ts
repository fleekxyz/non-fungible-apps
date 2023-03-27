import { FormField, useFormField } from '@/components';
import { createContext, StringValidators } from '@/utils';
import { useState } from 'react';

/**
 * The file size must be capped to a size that the contract can handle
 */
const DEFAULT_MAX_FILE_SIZE = 10; // in KB

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
      StringValidators.maxFileSize(DEFAULT_MAX_FILE_SIZE),
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
    ens: useFormField('ens', [StringValidators.required]),
    isValid: useState(false),
  },
});
