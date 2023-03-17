import { hasValidator } from '@/utils';
import { fileToBase64 } from '@/views/mint/nfa-step/form-step/form.utils';
import React, { forwardRef, useMemo, useState } from 'react';
import { Combobox, ComboboxItem } from '../core';
import { Input, LogoFileInput, Textarea } from '../core/input';
import {
  FormFieldContext,
  FormFieldProvider,
  useFormFieldContext,
} from './form-field.context';
import {
  FormProvider,
  useFormContext,
  useFormFieldValidatorValue,
} from './form.context';
import { FormStyles } from './form.styles';

export abstract class Form {
  static readonly Root = FormProvider;

  static readonly Field = forwardRef<HTMLDivElement, Form.FieldProps>(
    ({ children, context, ...props }, ref) => {
      const {
        value: [value],
      } = context;
      const validationEnabled = useState(Boolean(value));

      return (
        <FormFieldProvider value={{ ...context, validationEnabled }}>
          <FormStyles.Field ref={ref} {...props}>
            {children}
          </FormStyles.Field>
        </FormFieldProvider>
      );
    }
  );

  static readonly Label = forwardRef<HTMLLabelElement, Form.LabelProps>(
    ({ children, ...props }, ref) => {
      const { validators } = useFormFieldContext();

      const isRequired = useMemo(
        () => hasValidator(validators, 'required'),
        [validators]
      );

      return (
        <FormStyles.Label ref={ref} {...props}>
          {children}
          {isRequired && <FormStyles.RequiredLabel>*</FormStyles.RequiredLabel>}
        </FormStyles.Label>
      );
    }
  );

  static readonly Overline = forwardRef<HTMLDivElement>((props, ref) => {
    const {
      validations: [validations],
    } = useFormContext();
    const {
      id,
      value: [value],
      validationEnabled: [validationEnabled],
      validators,
    } = useFormFieldContext();

    const errors = useMemo(() => {
      if (!validationEnabled) return [];
      if (!validations[id]) return [];
      return validations[id].map((validator) => validator.message);
    }, [validations, id, validationEnabled]);

    const counter = useMemo(
      () => hasValidator(validators, 'maxLength')?.args || 0,
      [validators]
    );

    return (
      <FormStyles.Overline ref={ref} {...props}>
        <FormStyles.OverlineErrors>
          {errors.map((error) => (
            <FormStyles.ErrorMessage key={error}>
              {error}
            </FormStyles.ErrorMessage>
          ))}
        </FormStyles.OverlineErrors>

        {Boolean(counter) && (
          <FormStyles.MaxLength>
            {`${value.length}/${counter}`}
          </FormStyles.MaxLength>
        )}
      </FormStyles.Overline>
    );
  });

  static readonly Input = forwardRef<HTMLInputElement, Form.InputProps>(
    (props, ref) => {
      const {
        id,
        validators,
        value: [value, setValue],
        validationEnabled: [validationEnabled, setValidationEnabled],
      } = useFormFieldContext();
      const isValid = useFormFieldValidatorValue(id, validators, value);

      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
      };

      const handleInputBlur = () => {
        setValidationEnabled(true);
      };

      return (
        <Input
          ref={ref}
          {...props}
          value={value}
          onChange={handleInputChange}
          aria-invalid={validationEnabled && !isValid}
          onBlur={handleInputBlur}
        />
      );
    }
  );

  static readonly Combobox = forwardRef<HTMLInputElement, Form.ComboboxProps>(
    (props, ref) => {
      const {
        id,
        validators,
        value: [value, setValue],
        validationEnabled: [validationEnabled, setValidationEnabled],
      } = useFormFieldContext();

      const isValid = useFormFieldValidatorValue(id, validators, value);

      const handleComboboxChange = (value: string) => {
        setValue(value);
      };

      const handleComboboxBlur = () => {
        setValidationEnabled(true);
      };

      //TODO: add aria-invalid and onBlur

      return (
        <Combobox
          ref={ref}
          {...props}
          onChange={handleComboboxChange}
          selectedValue={value}
        />
      );
    }
  );

  static readonly Textarea = forwardRef<
    HTMLTextAreaElement,
    Form.TextareaProps
  >((props, ref) => {
    const {
      id,
      validators,
      value: [value, setValue],
      validationEnabled: [validationEnabled, setValidationEnabled],
    } = useFormFieldContext();
    const isValid = useFormFieldValidatorValue(id, validators, value);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    };

    const handleInputBlur = () => {
      setValidationEnabled(true);
    };

    return (
      <Textarea
        ref={ref}
        {...props}
        value={value}
        onChange={handleInputChange}
        aria-invalid={validationEnabled && !isValid}
        onBlur={handleInputBlur}
      />
    );
  });

  static readonly LogoFileInput = forwardRef<
    HTMLInputElement,
    Form.LogoFileInputProps
  >((props, ref) => {
    const {
      id,
      validators,
      value: [value, setValue],
      validationEnabled: [, setValidationEnabled],
    } = useFormFieldContext();

    const isValid = useFormFieldValidatorValue(id, validators, value);

    const handleFileInputChange = async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file = e.target.files?.[0];
      if (file) {
        //Convert to string base64 to send to contract
        setValidationEnabled(true);
        const fileBase64 = await fileToBase64(file);
        setValue(fileBase64);
      }
    };

    return (
      <LogoFileInput
        ref={ref}
        {...props}
        value={value}
        aria-invalid={value !== '' && !isValid}
        onChange={handleFileInputChange}
      />
    );
  });
}

export namespace Form {
  export type FieldProps = {
    children: React.ReactNode;
    context: Omit<FormFieldContext, 'validationEnabled'>;
  } & React.ComponentProps<typeof FormStyles.Field>;

  export type LabelProps = React.ComponentProps<typeof FormStyles.Label>;

  export type ErrorProps = React.ComponentProps<typeof FormStyles.ErrorMessage>;

  export type InputProps = Omit<
    React.ComponentProps<typeof Input>,
    'value' | 'onChange' | 'error'
  >;

  export type TextareaProps = Omit<
    React.ComponentProps<typeof Textarea>,
    'value' | 'onChange' | 'error'
  >;

  export type ComboboxProps = Omit<
    React.ComponentProps<typeof Combobox>,
    'onChange' | 'error' | 'selectedValue'
  >;

  export type LogoFileInputProps = Omit<
    React.ComponentProps<typeof LogoFileInput>,
    'value' | 'onChange'
  >;
}
