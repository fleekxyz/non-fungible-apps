/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Combobox, ComboboxInputProps } from '@headlessui/react';
import React, { useMemo, useState } from 'react';

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

type ComboboxItem = {
  label: string;
  value: string;
};

const [Provider, useContext] = createContext<ComboboxFactory.Context>({
  name: 'ComboboxContext',
  hookName: 'useComboboxContext',
  providerName: 'ComboboxProvider',
});

const defaultIdentifier = (item: ComboboxItem): string => item.label;
const defaultFilter = (query: string, item: ComboboxItem): boolean =>
  item.label.toLowerCase().includes(query.toLowerCase());

export const ComboboxFactory = {
  useContext,

  Root<T = ComboboxItem>({
    children,
    selected,
    isLoading: loading = false,
    ...props
  }: ComboboxFactory.RootProps<T>): JSX.Element {
    const [value, setValue] = selected;
    const query = useState('');

    return (
      <Combobox as={CS.Wrapper} value={value} onChange={setValue} {...props}>
        {({ open }) => (
          <Provider
            value={{
              selected: selected as ReactState<ComboboxItem | undefined>,
              query,
              loading,
              open,
            }}
          >
            {children}
          </Provider>
        )}
      </Combobox>
    );
  },

  Options<T = ComboboxItem>({
    items,
    search,
    children,
    // @ts-ignore
    filter = defaultFilter,
    // @ts-ignore
    identifier = defaultIdentifier,
  }: ComboboxFactory.OptionsProps<T>): JSX.Element {
    const {
      query: [query],
      loading,
      selected: [selected],
    } = useContext();

    const [
      optionRenderer,
      EmptyRender = EmptyMessage,
      LoadingRender = LoadingMessage,
    ] = useMemo(
      () => (Array.isArray(children) ? children : [children]),
      [children]
    );

    const filteredItems = useMemo(
      () => items.filter((item) => filter(query, item)),
      [items, query, filter]
    );

    return (
      <CS.Options>
        {search && (
          <CS.InnerSearchContainer>
            <Icon name="search" />
            <ComboboxFactory.Input placeholder="Search..." />
          </CS.InnerSearchContainer>
        )}

        {filteredItems.map((item) => {
          const id = identifier(item);
          const isSelected = selected === id;

          return (
            <CS.Option key={id} value={item}>
              {optionRenderer(item, isSelected)}
              {isSelected && <CS.SelectedIcon name="check" />}
            </CS.Option>
          );
        })}

        {!loading && filteredItems.length === 0 && EmptyRender}

        {loading && LoadingRender}
      </CS.Options>
    );
  },

  Input(props: ComboboxFactory.InputProps): JSX.Element {
    const {
      query: [, setQuery],
    } = useContext();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setQuery(event.target.value);
      if (props.onChange) props.onChange(event);
    };

    return <CS.Input {...props} onChange={onChange} />;
  },

  Field<T = ComboboxItem>({
    children,
    ...props
  }: ComboboxFactory.FieldProps<T>): JSX.Element {
    const {
      selected: [selected],
    } = useContext();

    return <CS.Field {...props}>{children(selected as T)}</CS.Field>;
  },

  Message: CS.Message,
};

export namespace ComboboxFactory {
  export type Context = {
    selected: ReactState<ComboboxItem | undefined>;
    query: ReactState<string>;
    loading: boolean;
    open: boolean;
  };

  type BaseOptionsProps<T> = {
    search?: boolean;
    items: T[];

    children:
      | ((item: T, selected: boolean) => React.ReactNode)
      | [
          (item: T, selected: boolean) => React.ReactNode,
          React.ReactNode?,
          React.ReactNode?
        ];
  };

  export type OptionsProps<T = ComboboxItem> = T extends ComboboxItem
    ? BaseOptionsProps<T>
    : BaseOptionsProps<T> & {
        filter: (query: string, item: T) => boolean;
        identifier: (item: T) => string;
      };

  export type RootProps<T = ComboboxItem> = Omit<
    React.ComponentPropsWithRef<typeof CS.Wrapper>,
    'defaultValue' | 'onChange'
  > & {
    selected: ReactState<T | undefined>;
    isLoading?: boolean;
  };

  export type InputProps<T = ComboboxItem> = ComboboxInputProps<
    'input',
    T | undefined
  >;

  export type FieldProps<T = ComboboxItem> = Omit<
    React.ComponentPropsWithRef<typeof CS.Field>,
    'children'
  > & {
    children: (item: T | undefined) => React.ReactElement | React.ReactNode;
  };
}
