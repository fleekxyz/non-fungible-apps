import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  forwardRef,
  Input,
} from '@chakra-ui/react';
import { Field } from 'formik';

type InputFieldFormProps = FormControlProps & {
  label: string;
  fieldName: string;
  error?: string;
};
export const InputFieldForm = forwardRef<InputFieldFormProps, 'div'>(
  ({ label, fieldName, error, ...formControlProps }, ref) => (
    <FormControl ref={ref} {...formControlProps}>
      <FormLabel htmlFor={fieldName}>{label}</FormLabel>
      <Field as={Input} name={fieldName} id={fieldName} type="text" />
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
);

