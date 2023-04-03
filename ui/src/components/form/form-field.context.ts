import { createContext, StringValidator } from '@/utils';

export type FormFieldContext = {
  id: string;
  validators: StringValidator[];
  value: ReactState<string>;
  validationEnabled: ReactState<boolean>;
};

export const [FormFieldProvider, useFormFieldContext] =
  createContext<FormFieldContext>({
    name: 'FormFieldContext',
    hookName: 'useFormFieldContext',
    providerName: 'FormFieldProvider',
  });
