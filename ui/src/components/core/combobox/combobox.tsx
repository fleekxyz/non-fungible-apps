import React, {
  forwardRef,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Combobox as ComboboxLib, Transition } from '@headlessui/react';
import { Icon, IconName } from '@/components/core/icon';
import { Flex } from '@/components/layout';
import { useDebounce } from '@/hooks/use-debounce';
import { Separator } from '../separator.styles';
import { cleanString } from './combobox.utils';

type ComboboxInputProps = {
  /**
   * If it's true, the list of options will be displayed
   */
  open: boolean;
  /**
   * Name of the left icon to display in the input
   */
  leftIcon: IconName;
  /**
   * Value to indicate it's invalid
   */
  error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ComboboxInput = ({
  open,
  leftIcon,
  onChange,
  onClick,
  onBlur,
  error,
}: ComboboxInputProps) => (
  <div className="relative w-full">
    <Icon
      name={leftIcon}
      size="sm"
      css={{
        position: 'absolute',
        left: '$3',
        top: '$3',
        fontSize: '$xl',
        color: 'slate8',
      }}
    />
    <ComboboxLib.Input
      placeholder="Search"
      className={`w-full  border-solid border  h-11  py-3 px-10 text-sm leading-5 text-slate11 outline-none ${
        open
          ? 'border-b-0 rounded-t-xl bg-black border-slate6'
          : `rounded-xl bg-transparent cursor-pointer ${
              error ? 'border-red9' : 'border-slate7'
            }`
      }`}
      displayValue={(selectedValue: ComboboxItem) => selectedValue.label}
      onChange={onChange}
      onClick={onClick}
      onBlur={onBlur}
    />
    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
      <Icon name="chevron-down" css={{ fontSize: '$xs' }} />
    </span>
  </div>
);

type ComboboxOptionProps = {
  option: ComboboxItem;
};

const ComboboxOption = ({ option }: ComboboxOptionProps) => (
  <ComboboxLib.Option
    value={option}
    className={({ active }) =>
      `relative cursor-default select-none py-2 px-3.5 text-slate11 rounded-xl mb-2 text-sm ${
        active ? 'bg-slate5 text-slate12' : 'bg-transparent'
      }`
    }
  >
    {({ selected, active }) => (
      <Flex css={{ justifyContent: 'space-between' }}>
        <Flex css={{ flexDirection: 'row', maxWidth: '95%' }}>
          {option.icon}
          <span
            className={`${active ? 'text-slate12' : 'text-slate11'} ${
              option.icon ? 'max-w-70' : 'max-w-full'
            } whitespace-nowrap text-ellipsis overflow-hidden`}
          >
            {option.label}
          </span>
        </Flex>
        {selected && <Icon name="check" color="white" />}
      </Flex>
    )}
  </ComboboxLib.Option>
);

export const NoResults = ({ css }: { css?: string }) => (
  <div
    className={`relative cursor-default select-none pt-2 px-3.5 pb-4 text-slate11 ${css}`}
  >
    Nothing found.
  </div>
);

export type ComboboxItem = {
  /**
   * The key of the item.
   */
  value: string;
  /**
   * The label to display of the item.
   */
  label: string;
  /**
   * Optional icon to display on the left of the item.
   */
  icon?: React.ReactNode;
};

export type ComboboxProps = {
  /**
   * List of items to be displayed in the combobox.
   */
  items: ComboboxItem[];
  /**
   * The selected value of the combobox.
   */
  selectedValue: ComboboxItem | undefined;
  /**
   * If true, the combobox will add the input if it doesn't exist in the list of items.
   */
  withAutocomplete?: boolean;
  /**
   * Name of the left icon to display in the input. Defualt is "search".
   */
  leftIcon?: IconName;
  /**
   * Callback when the selected value changes.
   */
  onChange: (option: ComboboxItem) => void;
  /**
   * Function to handle the input blur
   */
  onBlur?: () => void;
  /**
   * Value to indicate it's invalid
   */
  error?: boolean;
};

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  (
    {
      items,
      selectedValue = { value: '', label: '' },
      withAutocomplete = false,
      leftIcon = 'search',
      onChange,
      onBlur,
      error = false,
    },
    ref
  ) => {
    const [filteredItems, setFilteredItems] = useState<ComboboxItem[]>([]);
    const [autocompleteItems, setAutocompleteItems] = useState<ComboboxItem[]>(
      []
    );
    console.log('error', error);

    useEffect(() => {
      // If the selected value doesn't exist in the list of items, we add it
      if (
        items.filter((item) => item === selectedValue).length === 0 &&
        selectedValue.value !== undefined &&
        autocompleteItems.length === 0 &&
        withAutocomplete
      ) {
        setAutocompleteItems([selectedValue]);
      }
    }, [selectedValue]);

    useEffect(() => {
      setFilteredItems(items);
    }, [items]);

    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleSearch = useDebounce((searchValue: string) => {
      if (searchValue === '') {
        setFilteredItems(items);

        if (withAutocomplete) {
          setAutocompleteItems([]);
          handleComboboxChange({} as ComboboxItem);
        }
      } else {
        const filteredValues = items.filter((item) =>
          cleanString(item.label).startsWith(cleanString(searchValue))
        );

        if (withAutocomplete && filteredValues.length === 0) {
          // If the search value doesn't exist in the list of items, we add it
          setAutocompleteItems([{ value: searchValue, label: searchValue }]);
        }
        setFilteredItems(filteredValues);
      }
    }, 200);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.stopPropagation();
      handleSearch(event.target.value);
    };

    const handleInputClick = () => {
      buttonRef.current?.click();
    };

    const handleComboboxChange = (optionSelected: ComboboxItem) => {
      onChange(optionSelected);
    };

    const handleLeaveTransition = () => {
      setFilteredItems(items);
      if (selectedValue.value === undefined && withAutocomplete) {
        setAutocompleteItems([]);
        handleComboboxChange({} as ComboboxItem);
      }
    };

    return (
      <ComboboxLib
        value={selectedValue}
        by="value"
        onChange={handleComboboxChange}
      >
        {({ open }) => (
          <div className="relative">
            <ComboboxInput
              onChange={handleInputChange}
              onClick={handleInputClick}
              open={open}
              leftIcon={leftIcon}
              onBlur={onBlur}
              error={error}
            />
            <ComboboxLib.Button ref={buttonRef} className="hidden" />

            <Transition
              show={open}
              as={Fragment}
              enter="transition duration-400 ease-out"
              leave="transition ease-out duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={handleLeaveTransition}
            >
              <ComboboxLib.Options className="absolute max-h-60 w-full z-10 overflow-auto rounded-b-xl border-solid  border-slate6  border  bg-black pt-2 px-3 text-base focus:outline-none sm:text-sm">
                {[...autocompleteItems, ...filteredItems].length === 0 ||
                filteredItems === undefined ? (
                  <NoResults />
                ) : (
                  <>
                    {autocompleteItems.length > 0 && <span>Create new</span>}
                    {autocompleteItems.map(
                      (autocompleteOption: ComboboxItem) => (
                        <ComboboxOption
                          key={autocompleteOption.value}
                          option={autocompleteOption}
                        />
                      )
                    )}
                    {autocompleteItems.length > 0 &&
                      filteredItems.length > 0 && (
                        <Separator css={{ mb: '$2' }} />
                      )}
                    {filteredItems.map((option: ComboboxItem) => (
                      <ComboboxOption key={option.value} option={option} />
                    ))}
                  </>
                )}
              </ComboboxLib.Options>
            </Transition>
          </div>
        )}
      </ComboboxLib>
    );
  }
);
