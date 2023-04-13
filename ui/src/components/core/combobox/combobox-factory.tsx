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

type BuiltElements<T> = ComboboxFactory.Elements<T> & {
  Provider: React.Provider<ComboboxFactory.Context<T>>;
  useContext: () => ComboboxFactory.Context<T>;
};

function buildElements<T>(): BuiltElements<T> {
  const [Provider, useContext] = createContext<ComboboxFactory.Context<T>>({
    name: 'ComboboxContext',
    hookName: 'useComboboxContext',
    providerName: 'ComboboxProvider',
  });

  function Input(props: ComboboxFactory.InputProps<T>): JSX.Element {
    const {
      query: [, setQuery],
    } = useContext();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setQuery(event.target.value);
      if (props.onChange) props.onChange(event);
    };

    return <CS.Input {...props} onChange={onChange} />;
  }

  function Options({
    disableSearch,
    children,
    ...props
  }: ComboboxFactory.OptionsProps<T>): JSX.Element {
    const {
      query: [query],
      loading,
      selected: [selected],
      items,
      queryFilter,
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
            {selected === item && <CS.SelectedIcon name="check" />}
          </CS.Option>
        ))}

        {!loading && filteredItems.length === 0 && EmptyRender}

        {loading && LoadingRender}
      </CS.Options>
    );
  }

  function Field({
    children,
    ...props
  }: ComboboxFactory.FieldProps<T>): JSX.Element {
    const {
      selected: [selected],
    } = useContext();

    return <CS.Field {...props}>{children(selected as T)}</CS.Field>;
  }

  const Message = CS.Message;

  return {
    Provider,
    useContext,
    Options,
    Input,
    Field,
    Message,
  };
}

export function ComboboxFactory<T>({
  children,
  selected,
  isLoading: loading = false,
  items,
  queryFilter,
  ...props
}: ComboboxFactory.RootProps<T>): JSX.Element {
  const [value, setValue] = selected;
  const query = useState('');

  const { Provider, ...Elements } = useMemo(() => buildElements<T>(), []);

  return (
    <Combobox as={CS.Wrapper} value={value} onChange={setValue} {...props}>
      {({ open }) => (
        <Provider
          value={{
            selected,
            query,
            loading,
            open,
            items,
            queryFilter,
          }}
        >
          {children(Elements)}
        </Provider>
      )}
    </Combobox>
  );
}

export namespace ComboboxFactory {
  export type Context<T> = {
    selected: ReactState<T | undefined>;
    query: ReactState<string>;
    loading: boolean;
    open: boolean;
    items: T[];
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
    Pick<Context<T>, 'selected' | 'items' | 'queryFilter'> & {
      isLoading?: boolean;
      children: (elements: Elements<T>) => React.ReactNode;
    };
}
