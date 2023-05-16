import { useState } from 'react';

import { OrderDirection } from '@/../.graphclient';
import { Combobox, Flex } from '@/components';
import { AppLog } from '@/utils';

import { IndexedNFA } from '../../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';

type SortItem = {
  value: OrderDirection;
  label: string;
};

const orderResults: SortItem[] = [
  { value: 'desc', label: 'Newest' },
  { value: 'asc', label: 'Oldest' },
];

export const Header: React.FC = () => {
  const { setPageNumber, setOrderDirection, setEndReached } =
    IndexedNFA.useContext();
  const [selectedValue, setSelectedValue] = useState<SortItem>(orderResults[0]);

  const handleSortChange = (item: SortItem | undefined): void => {
    if (item) {
      setSelectedValue(item);
      setPageNumber(0);
      setEndReached(false);
      setOrderDirection(item.value);
    } else {
      AppLog.errorToast('Error selecting sort option. Try again');
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
