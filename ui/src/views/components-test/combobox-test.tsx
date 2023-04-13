import { useState } from 'react';

import { Combobox, Flex, Icon, IconName } from '@/components';

type Item = { id: number; label: string; icon: IconName };

const Items: Item[] = [
  { id: 1, label: 'Option 1', icon: 'branch' },
  { id: 2, label: 'Option 2', icon: 'ethereum' },
  { id: 3, label: 'Option 3', icon: 'metamask' },
];

export const ComboboxTest: React.FC = () => {
  const selected = useState<Item>();
  const queryFilter = (query: string, item: Item): boolean =>
    item.label.toLowerCase().includes(query.toLowerCase());

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
        items={Items}
        selected={selected}
        queryFilter={queryFilter}
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
      </Combobox>

      <Combobox
        unattached
        items={Items}
        selected={selected}
        queryFilter={queryFilter}
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
      </Combobox>
    </Flex>
  );
};
