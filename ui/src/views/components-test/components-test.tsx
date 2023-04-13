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

const NewComboboxTest = (): JSX.Element => {
  const selected = useState<Item>();

  return (
    <div style={{ position: 'relative', width: '600px', alignSelf: 'center' }}>
      <ComboboxFactory.Root
        unattached
        selected={selected}
        css={{ width: '400px' }}
      >
        <ComboboxFactory.Field<Item>>
          {(item) => (
            <>
              <Icon name={item?.icon || 'search'} />
              {item?.label || 'Select an option'}
            </>
          )}
        </ComboboxFactory.Field>

        <ComboboxFactory.Options
          items={Items}
          search
          filter={(query, item) =>
            item.label.toLowerCase().includes(query.toLowerCase())
          }
          identifier={(item) => item.label}
        >
          {(item) => (
            <>
              <Icon name={item.icon} /> {item.label}
            </>
          )}
        </ComboboxFactory.Options>
      </ComboboxFactory.Root>
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
