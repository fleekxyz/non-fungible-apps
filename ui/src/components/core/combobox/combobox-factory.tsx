import { Combobox, ComboboxInputProps } from '@headlessui/react';
import React, { useMemo, useState } from 'react';

import { Spinner } from '@/components/spinner';
import { forwardStyledRef } from '@/theme';
import { createContext, CreateContextReturn } from '@/utils';

import { Icon } from '../icon';
import { ComboboxStyles as CS } from './combobox.styles';

const EmptyMessage = <CS.Message>No items found</CS.Message>;
const LoadingMessage = (
  <CS.Message>
    <Spinner /> Searching...
  </CS.Message>
);

export class ComboboxFactory<T> {
  static readonly Root = Combobox;

  private readonly Provider: CreateContextReturn<ComboboxFactory.Context<T>>[0];

  private readonly useContext: CreateContextReturn<
    ComboboxFactory.Context<T>
  >[1];

  constructor(
    private identifier: (item: T) => string | number,
    private filter: (input: string, item: T) => boolean
  ) {
    const [Provider, useContext] = createContext<ComboboxFactory.Context<T>>({
      name: 'ComboboxContext',
      hookName: 'useComboboxContext',
      providerName: 'ComboboxProvider',
    });

    this.Provider = Provider;
    this.useContext = useContext;
  }

  public Root = forwardStyledRef<HTMLDivElement, ComboboxFactory.RootProps<T>>(
    ({ children, selected, isLoading: loading = false, ...props }, ref) => {
      const [value, setValue] = selected;
      const query = useState('');

      return (
        <CS.Wrapper ref={ref} {...props}>
          <Combobox value={value} onChange={setValue} nullable>
            {({ open }) => (
              <this.Provider value={{ selected, query, loading, open }}>
                {children}
              </this.Provider>
            )}
          </Combobox>
        </CS.Wrapper>
      );
    }
  );

  public Options = ({
    items,
    search,
    children,
  }: ComboboxFactory.OptionsProps<T>): JSX.Element => {
    const {
      query: [query],
      loading,
    } = this.useContext();

    const [
      optionRenderer,
      EmptyRender = EmptyMessage,
      LoadingRender = LoadingMessage,
    ] = useMemo(
      () => (Array.isArray(children) ? children : [children]),
      [children]
    );

    const filteredItems = useMemo(
      () => items.filter((item) => this.filter(query, item)),
      [items, query]
    );

    return (
      <CS.Options>
        {search && (
          <CS.InnerSearchContainer>
            <Icon name="search" />
            <this.Input placeholder="Search..." />
          </CS.InnerSearchContainer>
        )}

        {filteredItems.map((item) => {
          const id = this.identifier(item);
          const selected = this.useContext().selected[0];
          const isSelected =
            !!selected && this.identifier(selected) === this.identifier(item);

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
  };

  public Input = forwardStyledRef<
    HTMLInputElement,
    ComboboxFactory.InputProps<T>
  >((props, ref): JSX.Element => {
    const {
      query: [, setQuery],
    } = this.useContext();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setQuery(event.target.value);
      if (props.onChange) props.onChange(event);
    };

    return <CS.Input ref={ref} {...props} onChange={onChange} />;
  });

  public Field = forwardStyledRef<
    HTMLButtonElement,
    ComboboxFactory.FieldProps
  >((props, ref) => {
    const { open } = this.useContext();
    return <CS.Field {...props} ref={ref} open={open} />;
  });

  public Message = CS.Message;
}

export namespace ComboboxFactory {
  export type Context<T> = {
    selected: ReactState<T | undefined>;
    query: ReactState<string>;
    loading: boolean;
    open: boolean;
  };

  export type OptionsProps<T> = {
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

  export type RootProps<T> = React.ComponentPropsWithRef<typeof CS.Wrapper> & {
    selected: ReactState<T | undefined>;
    isLoading?: boolean;
  };

  export type InputProps<T> = ComboboxInputProps<'input', T | undefined>;

  export type FieldProps = React.ComponentPropsWithRef<typeof CS.Field>;
}
