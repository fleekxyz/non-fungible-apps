import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { Icon } from '@/components/core/icon';
import { Flex } from '@/components';

type DropdownOptionProps = {
  option: DropdownItem;
};

const DropdownOption = ({ option }: DropdownOptionProps) => (
  <Listbox.Option
    className={({ active }) =>
      `relative cursor-default select-none py-2 px-3.5 text-slate11 rounded-xl mb-2 text-sm max-w-full ${
        active ? 'bg-slate5 text-slate12' : 'bg-transparent'
      }`
    }
    value={option}
  >
    {({ selected, active }) => (
      <Flex css={{ justifyContent: 'space-between' }}>
        <span
          className={`${
            active ? 'text-slate12' : 'text-slate11'
          } max-w-full break-words pr-5`}
        >
          {option.label}
        </span>
        {selected && (
          <Icon
            name="check"
            color="white"
            css={{
              position: 'absolute',
              top: '$0',
              bottom: '$0',
              right: '$0',
              display: 'flex',
              alignItems: 'center',
              pr: '$4',
            }}
          />
        )}
      </Flex>
    )}
  </Listbox.Option>
);

type DropdownButtonProps = {
  /**
   * The selected value of the dropdown.
   */
  selectedValue: DropdownItem | undefined;
  /**
   * If it's true, the list of options will be displayed
   */
  open: boolean;
  /**
   * Background color of the dropdown. Should be on tailwind palette.
   */
  backgroundColor?: string;
  /**
   * Text color of the dropdown. Should be on tailwind palette.
   */
  textColor?: string;
};

const DropdownButton = ({
  selectedValue,
  open, //TODO maybe would be deprecated
  backgroundColor,
  textColor,
}: DropdownButtonProps) => {
  const textColorCss = textColor ? `text-${textColor}` : 'text-slate12';
  const borderColor = backgroundColor
    ? `border-${backgroundColor}`
    : 'border-slate7';
  const backgroundColorClass = backgroundColor
    ? `bg-${backgroundColor}`
    : 'bg-transparent';

  return (
    <Listbox.Button
      className={`relative w-full cursor-default ${borderColor} border-solid border rounded-xl py-3 pl-3.5 pr-10 h-11 text-left focus:outline-none sm:text-sm 
       ${backgroundColorClass} 
       `}
    >
      <span
        className={`block truncate ${
          selectedValue && selectedValue.label
            ? `${textColorCss}`
            : 'text-slate11'
        } break-words`}
      >
        {selectedValue && selectedValue.label ? selectedValue.label : 'Select'}
      </span>
      <span
        className={`pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 ${textColorCss}`}
      >
        <Icon name="chevron-down" />
      </span>
    </Listbox.Button>
  );
};

export type DropdownItem = {
  /**
   * The key of the item.
   */
  value: string;
  /**
   * The label to display of the item.
   */
  label: string;
};

export type DropdownProps = {
  /**
   * List of items to be displayed in the dropdown.
   */
  items: DropdownItem[];
  /**
   * The selected value of the dropdown.
   */
  selectedValue: DropdownItem | undefined;
  /**
   * Callback when the selected value changes.
   */
  onChange(option: DropdownItem): void;
  /**
   * Background color of the dropdown. Should be on tailwind palette. https://tailwindcss.com/docs/background-color
   */
  backgroundColor?: string;
  /**
   * Text color of the dropdown. Should be on tailwind palette. https://tailwindcss.com/docs/text-color
   */
  textColor?: string;
  /**
   * Width of the options list. Should be on tailwind width. https://tailwindcss.com/docs/width
   */
  optionsWidth?: string;
};

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedValue,
  onChange,
  backgroundColor,
  textColor,
  optionsWidth,
}) => {
  const handleDropdownChange = (option: DropdownItem) => {
    onChange(option);
  };
  const width = optionsWidth ? `w-${optionsWidth}` : 'w-full';

  return (
    <Listbox value={selectedValue} by="value" onChange={handleDropdownChange}>
      {({ open }) => (
        <div className="relative max-w-full">
          <DropdownButton
            selectedValue={selectedValue}
            open={open}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`absolute mt-1 max-h-32 ${width} z-10 overflow-auto rounded-xl bg-black px-3 pt-2 border-solid  border-slate6  border text-base focus:outline-none sm:text-sm`}
            >
              {items.map((option: DropdownItem) => (
                <DropdownOption key={option.value} option={option} />
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
