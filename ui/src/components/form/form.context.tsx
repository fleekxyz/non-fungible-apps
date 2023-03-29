import { createContext, StringValidator } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type FormValidations = { [key: string]: StringValidator[] };

export type FormContext = {
  onValidationChange: (isValid: boolean) => void;
  validations: ReactState<FormValidations>;
};

const [FormProviderCore, useFormContext] = createContext<FormContext>({
  name: 'FormContext',
  hookName: 'useFormContext',
  providerName: 'FormProvider',
});

export { useFormContext };

export const FormProvider = ({
  children,
  onValidationChange,
}: React.PropsWithChildren<
  Pick<FormContext, 'onValidationChange'>
>): JSX.Element => {
  const validations = useState<FormValidations>({});

  useEffect(() => {
    onValidationChange(Object.values(validations[0]).length === 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations]);

  return (
    <FormProviderCore value={{ onValidationChange, validations }}>
      {children}
    </FormProviderCore>
  );
};

export const useFormFieldValidator = (
  id: string,
  validators: StringValidator[]
): ((value: string) => boolean) => {
  const {
    validations: [, setValidations],
  } = useFormContext();

  return useCallback(
    (value: string) => {
      const fieldValidations = validators.reduce<StringValidator[]>(
        (acc, validator) =>
          validator.validate(value) ? acc : [...acc, validator],
        []
      );

      if (fieldValidations.length > 0) {
        setValidations((prev) => ({ ...prev, [id]: fieldValidations }));
        return false;
      }

      setValidations((prev) => {
        const { [id]: toBeRemoved, ...rest } = prev;
        return rest;
      });
      return true;
    },
    [id, validators, setValidations]
  );
};

export const useFormFieldValidatorValue = (
  id: string,
  validators: StringValidator[],
  value: string
): boolean => {
  const validatorHandler = useFormFieldValidator(id, validators);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => validatorHandler(value), [value]);
};
