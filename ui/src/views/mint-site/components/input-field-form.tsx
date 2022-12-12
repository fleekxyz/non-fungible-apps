import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field } from 'formik';
import React from 'react';

interface Props {
  label: string;
  fieldName: string;
  error?: string;
  touched?: boolean;
  mr?: number;
  isRequired?: boolean;
}
export const InputFieldForm: React.FC<Props> = ({
  label,
  fieldName,
  error,
  touched = false,
  mr,
  isRequired = false,
}) => (
  <>
    <FormControl
      {...(mr && { mr: mr })}
      isRequired={isRequired}
      isInvalid={!!error && touched}
    >
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Field as={Input} name={fieldName} id={fieldName} type="text" />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  </>
);

