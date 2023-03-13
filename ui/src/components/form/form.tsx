import React, { forwardRef } from 'react';
import { Input, LogoFileInput, Textarea } from '../core/input';
import { FormStyles } from './form.styles';

export abstract class Form {
  static readonly Field = forwardRef<HTMLDivElement, Form.FieldProps>(
    ({ children, ...props }, ref) => {
      return (
        <FormStyles.Field ref={ref} {...props}>
          {children}
        </FormStyles.Field>
      );
    }
  );

  static readonly Label = forwardRef<HTMLLabelElement, Form.LabelProps>(
    ({ children, isRequired, ...props }, ref) => (
      <FormStyles.Label ref={ref} {...props}>
        {children}{' '}
        {isRequired && <FormStyles.RequiredLabel>*</FormStyles.RequiredLabel>}
      </FormStyles.Label>
    )
  );

  static readonly MaxLength = forwardRef<HTMLLabelElement, Form.LabelProps>(
    ({ children, ...props }, ref) => {
      return (
        <FormStyles.MaxLength ref={ref} {...props}>
          {children}
        </FormStyles.MaxLength>
      );
    }
  );

  static readonly Error = forwardRef<HTMLDivElement, Form.ErrorProps>(
    ({ children, ...props }, ref) => (
      <FormStyles.ErrorMessage ref={ref} {...props}>
        {children}
      </FormStyles.ErrorMessage>
    )
  );

  static readonly Input = forwardRef<HTMLInputElement, Form.InputProps>(
    (props, ref) => {
      return <Input ref={ref} {...props} />;
    }
  );

  static readonly Textarea = forwardRef<
    HTMLTextAreaElement,
    Form.TextareaProps
  >((props, ref) => {
    return <Textarea ref={ref} {...props} />;
  });

  static readonly LogoFileInput = forwardRef<
    HTMLInputElement,
    Form.LogoFileInputProps
  >((props, ref) => {
    return <LogoFileInput ref={ref} {...props} />;
  });
}

export namespace Form {
  export type FieldProps = {
    children: React.ReactNode;
  } & React.ComponentProps<typeof FormStyles.Field>;

  export type LabelProps = { isRequired?: boolean } & React.ComponentProps<
    typeof FormStyles.Label
  >;

  export type ErrorProps = React.ComponentProps<typeof FormStyles.ErrorMessage>;

  export type InputProps = React.ComponentProps<typeof Input>;

  export type TextareaProps = React.ComponentProps<typeof Textarea>;

  export type LogoFileInputProps = React.ComponentProps<typeof LogoFileInput>;
}
