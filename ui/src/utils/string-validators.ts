/* eslint-disable @typescript-eslint/no-explicit-any */
export type StringValidator = {
  name: string;
  message: string;
  validate: (value?: string) => boolean;
};

type StringValidatorWithParams<T> = (args: T) => StringValidator & { args: T };

const required: StringValidator = {
  name: 'required',
  validate: (value = '') => {
    return value.length > 0;
  },
  message: 'This field is required',
};

const maxLength: StringValidatorWithParams<number> = (length: number) => ({
  name: 'maxLength',
  validate: (value = '') => value.length <= length,
  message: 'This field is too long',
  args: length,
});

const isUrl: StringValidator = {
  name: 'isUrl',
  validate: (value = '') => {
    const regex =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return regex.test(value);
  },
  message: 'Is not a valid URL',
};

const maxFileSize: StringValidatorWithParams<number> = (maxSize: number) => ({
  name: 'maxFileSize',
  validate: (value = '') => {
    const file: File = new File([value], 'file');
    return file.size <= 1024 * maxSize;
  },
  message: 'File is too large',
  args: maxSize,
});

const hasSpecialCharacters: StringValidator = {
  name: 'specialCharacters',
  validate: (value = '') => {
    if (value !== '') {
      const regex = /[!@#$%^&*()?":{}|<>`/]/;
      return !regex.test(value);
    }
    return true;
  },
  message: 'This field has special characters',
};

const isValidDomain: StringValidator = {
  name: 'isValidDomain',
  validate: (value = '') => {
    const regex =
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;
    return regex.test(value);
  },
  message: 'This field is not a valid domain',
};

export const StringValidators = {
  required,
  maxLength,
  isUrl,
  maxFileSize,
  hasSpecialCharacters,
  isValidDomain,
};

export const hasValidator = <
  Name extends keyof typeof StringValidators,
  Type = (typeof StringValidators)[Name]
>(
  validators: StringValidator[],
  name: Name
): Type extends StringValidatorWithParams<any>
  ? ReturnType<Type> | undefined
  : StringValidator | undefined =>
  validators.find((validator) => validator.name === name) as any;
