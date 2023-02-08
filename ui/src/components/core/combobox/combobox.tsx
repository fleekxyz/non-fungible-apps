import { Fragment, useRef, useState } from 'react';
import { Combobox as ComboboxLib, Transition } from '@headlessui/react';
import { Icon, IconName } from '@/components/core/icon';
import { Flex } from '@/components/layout';

type ComboboxInputProps = {
  open: boolean;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputClick: () => void;
};

const ComboboxInput = ({
  open,
  handleInputChange,
  handleInputClick,
}: ComboboxInputProps) => (
  <div className="relative">
    <Icon
      name="search"
      size="sm"
      css={{
        position: 'absolute',
        left: '$3',
        top: '0.9375rem',
        color: 'slate8',
      }}
    />
    <ComboboxLib.Input
      placeholder="Search"
      className={`w-full border-solid border border-slate7  py-3 pl-8 pr-10 text-sm bg-transparent leading-5 text-slate11 outline-none ${
        open ? 'border-b-0 rounded-t-xl bg-black border-slate6' : 'rounded-xl'
      }`}
      displayValue={(selectedValue: ComboboxItem) => selectedValue.label}
      onChange={handleInputChange}
      onClick={handleInputClick}
    />
  </div>
);

type ComboboxOptionProps = {
  option: ComboboxItem;
};

const ComboboxOption = ({ option }: ComboboxOptionProps) => (
  <ComboboxLib.Option
    key={option.value}
    value={option}
    className={({ active }) =>
      `relative cursor-default select-none py-2 px-3.5 text-slate11 rounded-xl mb-2 text-sm ${
        active ? 'bg-slate5 text-slate12' : 'bg-transparent'
      }`
    }
  >
    {({ selected, active }) => (
      <Flex css={{ justifyContent: 'space-between' }}>
        <Flex css={{ flexDirection: 'row' }}>
          {option.icon && <Icon name={option.icon} css={{ mr: '$2' }} />}
          <span className={`${active ? 'text-slate12' : 'text-slate11'}`}>
            {option.label}
          </span>
        </Flex>
        {selected && <Icon name="check" color="white" />}
      </Flex>
    )}
  </ComboboxLib.Option>
);

const NoResults = () => (
  <div className="relative cursor-default select-none pt-2 px-3.5 pb-4 text-slate11">
    Nothing found.
  </div>
);

export type ComboboxItem = {
  value: string;
  label: string;
  icon?: IconName;
};

export type ComboboxProps = {
  items: ComboboxItem[];
  selectedValue: ComboboxItem | undefined;
  onChange(option: ComboboxItem): void;
};

export const Combobox: React.FC<ComboboxProps> = ({
  items,
  selectedValue = { value: '', label: '' },
  onChange,
}) => {
  const [query, setQuery] = useState('');

  const buttonRef = useRef<HTMLButtonElement>(null);

  const filteredItems =
    query === ''
      ? items
      : items.filter((person) =>
          person.label
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleInputClick = () => {
    buttonRef.current?.click();
  };

  const handleComboboxChange = (option: ComboboxItem) => {
    onChange(option);
  };

  const handleLeaveTransition = () => {
    setQuery('');
  };

  return (
    <ComboboxLib
      value={selectedValue}
      by="value"
      onChange={handleComboboxChange}
    >
      {({ open }) => (
        <>
          <div className="w-full cursor-default overflow-hidden bg-transparent text-left focus:outline-none sm:text-sm">
            <ComboboxInput
              handleInputChange={handleInputChange}
              handleInputClick={handleInputClick}
              open={open}
            />
            <ComboboxLib.Button ref={buttonRef} className="hidden" />
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition duration-400 ease-out"
            leave="transition ease-out duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={handleLeaveTransition}
          >
            <ComboboxLib.Options className="absolute max-h-60 w-inherit z-10 overflow-auto rounded-b-xl border-solid  border-slate6  border  bg-black pt-2 px-3 text-base focus:outline-none sm:text-sm">
              {filteredItems.length === 0 && query !== '' ? (
                <NoResults />
              ) : (
                filteredItems.map((option) => {
                  return <ComboboxOption option={option} />;
                })
              )}
            </ComboboxLib.Options>
          </Transition>
        </>
      )}
    </ComboboxLib>
  );
};
