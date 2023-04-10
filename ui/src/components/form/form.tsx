/* eslint-disable react/display-name */
import React, { forwardRef, useMemo, useState } from 'react';

import { hasValidator } from '@/utils';
import { fileToBase64 } from '@/views/mint/nfa-step/form-step/form.utils';

import { ColorPicker, Combobox, ComboboxItem } from '../core';
import { Input, LogoFileInput, Textarea } from '../core/input';
import {
  FormProvider,
  useFormContext,
  useFormFieldValidatorValue,
} from './form.context';
import { FormStyles } from './form.styles';
import {
  FormFieldContext,
  FormFieldProvider,
  useFormFieldContext,
} from './form-field.context';

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

      const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>
      ): void => {
        if (props.onChange) props.onChange(e);
        setValue(e.target.value);
      };

      const handleInputBlur = (
        e: React.FocusEvent<HTMLInputElement, Element>
      ): void => {
        if (props.onBlur) props.onBlur(e);
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

  static readonly Combobox: React.FC<Form.ComboboxProps> = (props) => {
    const {
      id,
      validators,
      value: [value, setValue],
      validationEnabled: [validationEnabled, setValidationEnabled],
    } = useFormFieldContext();

    const comboboxValue = useMemo(() => {
      // if it's with autocomplete maybe won't be on the items list
      const item = props.items.find((item) => item.label === value);
      if (props.withAutocomplete && !item && value !== '') {
        //return the selected value if the item doesn't exist
        return { label: value, value: value };
      }
      return item;
    }, [props.items, props.withAutocomplete, value]);

    const isValid = useFormFieldValidatorValue(id, validators, value);

    const handleComboboxChange = (option: ComboboxItem): void => {
      if (props.onChange) props.onChange(option);
      setValue(option.label);
    };

    const handleComboboxBlur = (): void => {
      setValidationEnabled(true);
    };

    return (
      <Combobox
        {...props}
        onChange={handleComboboxChange}
        selectedValue={comboboxValue || ({} as ComboboxItem)}
        onBlur={handleComboboxBlur}
        error={validationEnabled && !isValid}
      />
    );
  };

  static readonly ColorPicker: React.FC<Form.ColorPickerProps> = ({
    logo,
    setLogoColor,
  }: Form.ColorPickerProps) => {
    const {
      value: [value, setValue],
      validationEnabled: [, setValidationEnabled],
    } = useFormFieldContext();

    const handleColorChange = (color: string): void => {
      if (setLogoColor) setLogoColor(color);
      setValue(color);
    };

    const handleInputBlur = (): void => {
      setValidationEnabled(true);
    };

    return (
      <ColorPicker
        logo={logo}
        logoColor={value}
        setLogoColor={handleColorChange}
        onBlur={handleInputBlur}
      />
    );
  };

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

    const handleTextareaChange = (
      e: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
      if (props.onChange) props.onChange(e);
      setValue(e.target.value);
    };

    const handleTextareaBlur = (
      e: React.FocusEvent<HTMLTextAreaElement, Element>
    ): void => {
      if (props.onBlur) props.onBlur(e);
      setValidationEnabled(true);
    };

    return (
      <Textarea
        ref={ref}
        {...props}
        value={value}
        onChange={handleTextareaChange}
        aria-invalid={validationEnabled && !isValid}
        onBlur={handleTextareaBlur}
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
    ): void => {
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

  export type InputProps = Omit<React.ComponentProps<typeof Input>, 'error'>;

  export type TextareaProps = Omit<
    React.ComponentProps<typeof Textarea>,
    'value' | 'error'
  >;

  export type ComboboxProps = {
    onChange?: (option: ComboboxItem) => void;
  } & Omit<
    React.ComponentProps<typeof Combobox>,
    'error' | 'selectedValue' | 'onChange'
  >;

  export type LogoFileInputProps = Omit<
    React.ComponentProps<typeof LogoFileInput>,
    'value' | 'onChange'
  >;

  export type ColorPickerProps = {
    setLogoColor?: (color: string) => void;
  } & Omit<
    React.ComponentProps<typeof ColorPicker>,
    'setLogoColor' | 'logoColor'
  >;
}
