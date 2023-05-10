import { useState } from 'react';

import { Combobox, Flex } from '@/components';

import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';

type SortItem = {
  value: string;
  label: string;
};

const orderResults: SortItem[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
];

export const Header: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<SortItem>(orderResults[0]);

  const handleSortChange = (item: SortItem | undefined): void => {
    //TODO integrate with context and sort
    if (item) {
      setSelectedValue(item);
    }
  };
  return (
    <>
      <Flex css={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <S.Main.Heading>Hosted NFAs</S.Main.Heading>
        <Combobox
          items={orderResults}
          selected={[selectedValue, handleSortChange]}
          css={{ minWidth: '$28' }}
          queryKey="label"
        >
          {({ Field, Options }) => (
            <>
              <Field
                css={{
                  backgroundColor: 'transparent',
                  borderColor: '$slate6',
                  color: '$slate11',
                }}
              >
                {(selected) => selected?.label || 'Select'}
              </Field>
              <Options disableSearch css={{ minWidth: '$44', left: 'unset' }}>
                {(item) => item.label}
              </Options>
            </>
          )}
        </Combobox>
      </Flex>
    </>
  );
};
