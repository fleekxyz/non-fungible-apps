import { Combobox, ComboboxItem, Flex } from '@/components';
import { useState } from 'react';

const itemsCombobox = [
  { label: 'Item 1', value: 'item-1' },
  { label: 'Item 2', value: 'item-2' },
  { label: 'Item 3', value: 'item-3' },
];

export const ComponentsTest = () => {
  const [selectedValue, setSelectedValue] = useState({} as ComboboxItem);
  const [selectedValueAutocomplete, setSelectedValueAutocomplete] = useState(
    {} as ComboboxItem
  );

  const handleComboboxChange = (item: ComboboxItem) => {
    setSelectedValue(item);
  };

  const handleComboboxChangeAutocomplete = (item: ComboboxItem) => {
    setSelectedValueAutocomplete(item);
  };

  return (
    <Flex
      css={{
        flexDirection: 'column',
        margin: '100px',
        width: '175px',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      <h1>Components Test</h1>
      <p>Check the console for the output.</p>
      <Combobox
        items={itemsCombobox}
        selectedValue={selectedValue}
        onChange={handleComboboxChange}
      />
      <Combobox
        items={itemsCombobox}
        selectedValue={selectedValueAutocomplete}
        onChange={handleComboboxChangeAutocomplete}
        withAutocomplete
      />
    </Flex>
  );
};
