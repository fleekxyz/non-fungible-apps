import { forwardRef } from 'react';
import { File, Input, Textarea } from '../core/input';
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
    ({ children, ...props }, ref) => (
      <FormStyles.Label ref={ref} {...props}>
        {children}
      </FormStyles.Label>
    )
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

  static readonly File = forwardRef<HTMLInputElement, Form.InputProps>(
    (props, ref) => {
      return <File ref={ref} {...props} />;
    }
  );
}

export namespace Form {
  export type FieldProps = {
    children: React.ReactNode;
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
}
