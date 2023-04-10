import { useState } from 'react';

import { Flex, Icon, IconName } from '@/components';
import { ComboboxClass } from '@/components/core/combobox/new-combobox';

import { ColorPickerTest } from './color-picker';
import { ComboboxTest } from './combobox-test';
import { ToastTest } from './toast-test';

type Item = { id: number; label: string; icon: IconName };

const Items: Item[] = [
  { id: 1, label: 'Option 1', icon: 'branch' },
  { id: 2, label: 'Option 2', icon: 'ethereum' },
  { id: 3, label: 'Option 3', icon: 'metamask' },
];

const ItemsCombobox = new ComboboxClass<Item>(
  (item) => item.id,
  (query, item) => item.label.toLowerCase().includes(query.toLowerCase())
);

const NewComboboxTest = (): JSX.Element => {
  const selected = useState<Item>();

  return (
    <ItemsCombobox.Root
      selected={selected}
      isLoading
      css={{ width: '400px', alignSelf: 'center' }}
    >
      <ItemsCombobox.Field>
        <Icon name={selected[0]?.icon || 'search'} />
        <ItemsCombobox.Input
          placeholder="Search"
          displayValue={(item) => item?.label || ''}
        />
      </ItemsCombobox.Field>

      <ItemsCombobox.Options items={Items}>
        {(item) => (
          <>
            <Icon name={item.icon} /> {item.label}
          </>
        )}
      </ItemsCombobox.Options>
    </ItemsCombobox.Root>
  );
};

export const ComponentsTest: React.FC = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <ColorPickerTest />
      <ToastTest />
      <NewComboboxTest />
      <ComboboxTest />
    </Flex>
  );
};
