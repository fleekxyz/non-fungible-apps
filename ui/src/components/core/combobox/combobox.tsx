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
   * Function to handle the input change
   */
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /**
   * Function to handle the input click. When the user clicks on the input, the list of options will be displayed
   */
  handleInputClick: () => void;
};

const ComboboxInput = ({
  open,
  leftIcon,
  handleInputChange,
  handleInputClick,
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
      className={`w-full  border-solid border border-slate7 h-11  py-3 px-10 text-sm leading-5 text-slate11 outline-none ${
        open
          ? 'border-b-0 rounded-t-xl bg-black border-slate6'
          : 'rounded-xl bg-transparent cursor-pointer'
      }`}
      displayValue={(selectedValue: ComboboxItem) => selectedValue.label}
      onChange={handleInputChange}
      onClick={handleInputClick}
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
  selectedValue: string | undefined;
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
  onChange(option: string): void;
};

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(
  ({
    items,
    selectedValue = '',
    withAutocomplete = false,
    leftIcon = 'search',
    onChange,
  }) => {
    const [filteredItems, setFilteredItems] = useState<ComboboxItem[]>([]);
    const [autocompleteItems, setAutocompleteItems] = useState<ComboboxItem[]>(
      []
    );

    useEffect(() => {
      // If the selected value doesn't exist in the list of items, we add it
      if (
        items.filter((item) => item.value === selectedValue).length === 0 &&
        selectedValue !== '' &&
        autocompleteItems.length === 0 &&
        withAutocomplete
      ) {
        setAutocompleteItems([{ value: selectedValue, label: selectedValue }]);
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
      onChange(optionSelected.value);
    };

    const handleLeaveTransition = () => {
      setFilteredItems(items);
      if (selectedValue === '' && withAutocomplete) {
        setAutocompleteItems([]);
        handleComboboxChange({} as ComboboxItem);
      }
    };

    const getComboboxValue = (): ComboboxItem => {
      if (selectedValue !== '') {
        if (withAutocomplete) {
          //look for the selected value in the autocomplete items list and the items list
          const autocompleteItem = autocompleteItems.find(
            (item) => item.value === selectedValue
          );
          if (autocompleteItem) {
            //if the selected value is in the autocomplete items list, we return it
            return autocompleteItem;
          } else {
            //if the selected value is not in the autocomplete items list, we look for it in the items list
            const item = items.find((item) => item.value === selectedValue);
            if (item) {
              //if the selected value is in the items list, we return it
              return item;
            }
          }
        } else {
          //if the selected value is not in the autocomplete items list, we look for it in the items list
          const item = items.find((item) => item.value === selectedValue);
          if (item) {
            //if the selected value is in the items list, we return it
            return item;
          }
        }
      }
      return { value: '', label: '' };
    };

    return (
      <ComboboxLib
        value={getComboboxValue()}
        by="value"
        onChange={handleComboboxChange}
      >
        {({ open }) => (
          <div className="relative">
            <ComboboxInput
              handleInputChange={handleInputChange}
              handleInputClick={handleInputClick}
              open={open}
              leftIcon={leftIcon}
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
