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
  const queryFilter = (query: string, item: Item): boolean =>
    item.label.toLowerCase().includes(query.toLowerCase());

  return (
    <div style={{ position: 'relative', width: '600px', alignSelf: 'center' }}>
      <ComboboxFactory
        unattached
        items={Items}
        selected={selected}
        queryFilter={queryFilter}
        css={{ width: '400px' }}
      >
        {({ Field, Options }) => (
          <>
            <Field>
              {(selected) => (
                <>
                  <Icon name={selected?.icon || 'search'} />
                  {selected?.label || 'Select an option'}
                </>
              )}
            </Field>

            <Options>
              {(item) => (
                <>
                  <Icon name={item.icon} /> {item.label}
                </>
              )}
            </Options>
          </>
        )}
      </ComboboxFactory>
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
