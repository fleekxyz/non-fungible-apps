import { useState } from 'react';

import { Combobox, Flex, Icon, IconName } from '@/components';

type Item = { id: number; label: string; icon: IconName };

type ItemDropdown = { id: number; label: string };

const Items: Item[] = [
  { id: 1, label: 'Option 1', icon: 'branch' },
  { id: 2, label: 'Option 2', icon: 'ethereum' },
  { id: 3, label: 'Option 3', icon: 'metamask' },
];

const ItemsDropdown: ItemDropdown[] = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
];

export const ComboboxTest: React.FC = () => {
  const selected = useState<Item>();
  const selectedDropdown = useState<ItemDropdown>();

  return (
    <Flex
      css={{
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: '10px',
        width: '600px',
        alignSelf: 'center',
      }}
    >
      <Combobox
        unattached
        items={ItemsDropdown}
        selected={selectedDropdown}
        queryKey="label"
      >
        {({ Field, Options }) => (
          <>
            <Field css={{ backgroundColor: '$slate4', borderColor: '$slate4' }}>
              {(selected) => <>{selected?.label || 'Select an option'}</>}
            </Field>

            <Options disableSearch>{(item) => <>{item.label}</>}</Options>
          </>
        )}
      </Combobox>

      <Combobox unattached items={Items} selected={selected} queryKey="label">
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
      </Combobox>
    </Flex>
  );
};
