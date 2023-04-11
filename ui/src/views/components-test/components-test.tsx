import { useState } from 'react';

import { ComboboxFactory, Flex, Icon, IconName } from '@/components';

import { ColorPickerTest } from './color-picker';
import { ComboboxTest } from './combobox-test';
import { ToastTest } from './toast-test';

type Item = { id: number; label: string; icon: IconName };

const Items: Item[] = [
  { id: 1, label: 'Option 1', icon: 'branch' },
  { id: 2, label: 'Option 2', icon: 'ethereum' },
  { id: 3, label: 'Option 3', icon: 'metamask' },
];

const ItemsCombobox = new ComboboxFactory<Item>(
  (item) => item.id,
  (query, item) => item.label.toLowerCase().includes(query.toLowerCase())
);

const NewComboboxTest = (): JSX.Element => {
  const selected = useState<Item>();

  return (
    <div style={{ position: 'relative', width: '600px', alignSelf: 'center' }}>
      <ItemsCombobox.Root
        unattached
        selected={selected}
        css={{ width: '400px' }}
      >
        <ItemsCombobox.Field>
          <Icon name={selected[0]?.icon || 'search'} />
          <span>{selected[0]?.label || 'Select something'}</span>
          {/* <ItemsCombobox.Input
            placeholder="Search..."
            displayValue={(item) => item?.label || ''}
          /> */}
        </ItemsCombobox.Field>

        <ItemsCombobox.Options items={Items} search>
          {(item) => (
            <>
              <Icon name={item.icon} /> {item.label}
            </>
          )}
          <ItemsCombobox.Message>
            No results found for that search
          </ItemsCombobox.Message>
        </ItemsCombobox.Options>
      </ItemsCombobox.Root>
    </div>
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
