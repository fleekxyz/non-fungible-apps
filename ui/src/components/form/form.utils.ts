import { useState } from 'react';
import { StringValidator } from '@/utils';
import { FormFieldContext } from './form-field.context';

export type FormField = Omit<FormFieldContext, 'validationEnabled'>;

export const useFormField = (
  id: string,
  validators: StringValidator[],
  initialValue = ''
): FormField => {
  const value = useState(initialValue);

  return {
    id,
    validators,
    value,
  };
};
