import {
  Combobox as HeadlessCombobox,
  ComboboxInputProps,
} from '@headlessui/react';
import React, { useCallback, useMemo, useState } from 'react';

import { Spinner } from '@/components/spinner';
import { createContext } from '@/utils';

import { Icon } from '../icon';
import { ComboboxStyles as CS } from './combobox.styles';

const EmptyMessage = <CS.Message>No items found</CS.Message>;
const LoadingMessage = (
  <CS.Message>
    <Spinner /> Searching...
  </CS.Message>
);

const [Provider, useContext] = createContext<Combobox.Context<unknown>>({
  name: 'ComboboxContext',
  hookName: 'useComboboxContext',
  providerName: 'ComboboxProvider',
});

const Input = <T,>(props: Combobox.InputProps<T>): JSX.Element => {
  const {
    query: [, setQuery],
  } = useContext() as Combobox.Context<T>;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(event.target.value);
    if (props.onChange) props.onChange(event);
  };

  return <CS.Input {...props} onChange={onChange} />;
};

const Options = <T,>({
  disableSearch,
  children,
  ...props
}: Combobox.OptionsProps<T>): JSX.Element => {
  const {
    query: [query],
    loading,
    selected: [selected],
    items,
    queryFilter,
  } = useContext() as Combobox.Context<T>;

  const [
    optionRenderer,
    EmptyRender = EmptyMessage,
    LoadingRender = LoadingMessage,
  ] = useMemo(
    () => (Array.isArray(children) ? children : [children]),
    [children]
  );

  const filteredItems = useMemo(
    () => items.filter((item) => queryFilter(query, item)),
    [items, query, queryFilter]
  );

  return (
    <CS.Options {...props}>
      {!disableSearch && (
        <CS.InnerSearchContainer>
          <Icon name="search" />
          <Input placeholder="Search..." />
        </CS.InnerSearchContainer>
      )}

      {filteredItems.map((item) => (
        <CS.Option key={JSON.stringify(item)} value={item}>
          {optionRenderer(item, selected === item)}
          {selected === item && <CS.RightPositionedIcon name="check" />}
        </CS.Option>
      ))}

      {!loading && filteredItems.length === 0 && EmptyRender}

      {loading && LoadingRender}
    </CS.Options>
  );
};

const Field = <T,>({
  children,
  disableChevron,
  ...props
}: Combobox.FieldProps<T>): JSX.Element => {
  const {
    selected: [selected],
  } = useContext() as Combobox.Context<T>;

  return (
    <CS.Field {...props}>
      {children(selected)}
      {!disableChevron && <CS.RightPositionedIcon name="chevron-down" />}
    </CS.Field>
  );
};

export const Combobox = <T,>({
  children,
  selected,
  isLoading: loading = false,
  items,
  queryKey,
  ...props
}: Combobox.RootProps<T>): JSX.Element => {
  const [value, setValue] = selected;
  const query = useState('');

  const queryFilter = useCallback(
    (query: string, item: T): boolean => {
      if (typeof queryKey === 'undefined')
        return `${item}`.includes(query.toLowerCase());

      const keys = Array.isArray(queryKey) ? queryKey : [queryKey];

      const searchString = keys
        .reduce((acc, key) => {
          const value = item[key];
          return `${acc} ${value}`;
        }, '')
        .toLowerCase();

      return searchString.includes(query.toLowerCase());
    },
    [queryKey]
  );

  const TypedProvider = Provider as React.Provider<Combobox.Context<T>>;

  return (
    <HeadlessCombobox
      as={CS.Wrapper}
      value={value}
      onChange={setValue}
      {...props}
    >
      {({ open }) => (
        <TypedProvider
          value={{
            selected,
            query,
            loading,
            open,
            items,
            queryFilter,
          }}
        >
          {children({
            Options: Options<T>,
            Input: Input<T>,
            Field: Field<T>,
            Message: CS.Message,
          })}
        </TypedProvider>
      )}
    </HeadlessCombobox>
  );
};

export namespace Combobox {
  export type Context<T> = {
    items: T[];
    selected: [T | undefined, (newState: T | undefined) => void];
    query: ReactState<string>;
    loading: boolean;
    open: boolean;
    queryFilter: (query: string, item: T) => boolean;
  };

  export type OptionsProps<T> = Omit<
    React.ComponentPropsWithRef<typeof CS.Options>,
    'children'
  > & {
    disableSearch?: boolean;
    children:
      | ((item: T, selected: boolean) => React.ReactNode)
      | [
          (item: T, selected: boolean) => React.ReactNode,
          React.ReactNode?,
          React.ReactNode?
        ];
  };

  export type InputProps<T> = ComboboxInputProps<'input', T | undefined>;

  export type FieldProps<T> = Omit<
    React.ComponentPropsWithRef<typeof CS.Field>,
    'children'
  > & {
    children: (item: T | undefined) => React.ReactElement | React.ReactNode;
    disableChevron?: boolean;
  };

  export type Elements<T> = {
    Options: React.FC<OptionsProps<T>>;
    Input: React.FC<InputProps<T>>;
    Field: React.FC<FieldProps<T>>;
    Message: typeof CS.Message;
  };

  export type RootProps<T> = Omit<
    React.ComponentPropsWithRef<typeof CS.Wrapper>,
    'defaultValue' | 'onChange' | 'children'
  > &
    Pick<Context<T>, 'selected' | 'items'> & {
      isLoading?: boolean;
      children: (elements: Elements<T>) => React.ReactNode;
    } & (T extends object
      ? { queryKey: keyof T | (keyof T)[] }
      : { queryKey?: undefined });
}
