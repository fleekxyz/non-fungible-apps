import { useState } from 'react';

import { Combobox, ComboboxItem, Flex } from '@/components';

const itemsCombobox = [
  { label: 'Item 1', value: 'item-1' },
  { label: 'Item 2', value: 'item-2' },
  { label: 'Item 3', value: 'item-3' },
];

export const ComboboxTest: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState({} as ComboboxItem);
  const [selectedValueAutocomplete, setSelectedValueAutocomplete] = useState(
    {} as ComboboxItem
  );

  const handleComboboxChange = (value: ComboboxItem): void => {
    setSelectedValue(value);
  };

  const handleComboboxChangeAutocomplete = (value: ComboboxItem): void => {
    setSelectedValueAutocomplete(value);
  };

  return (
    <Flex
      css={{
        flexDirection: 'column',
        margin: '100px',

        justifyContent: 'center',
        gap: '10px',
      }}
    >
      <h1>Components Test</h1>
      <Flex css={{ width: '600px', gap: '$2' }}>
        <Combobox
          items={itemsCombobox}
          selectedValue={selectedValue}
          onChange={handleComboboxChange}
          leftIcon="github"
        />

        <Combobox
          items={itemsCombobox}
          selectedValue={selectedValueAutocomplete}
          onChange={handleComboboxChangeAutocomplete}
          withAutocomplete
        />
      </Flex>
    </Flex>
  );
};
