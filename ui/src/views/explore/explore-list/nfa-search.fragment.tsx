import { useState } from 'react';

import { Combobox, InputGroup, InputGroupText } from '@/components';
import { useDebounce } from '@/hooks';
import { AppLog } from '@/utils';

import { Explore } from '../explore.context';
import { NFASearchFragmentStyles as S } from './nfa-search.styles';

type SortItem = {
  value: string;
  label: string;
};

const orderResults: SortItem[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Sort A-Z' },
  { value: 'z-a', label: 'Sort Z-A' },
];

export const NFASearchFragment: React.FC = () => {
  const {
    setEndReached,
    setOrderBy,
    setOrderDirection,
    setSearch,
    setPageNumber,
  } = Explore.useContext();
  const [selectedValue, setSelectedValue] = useState<SortItem>(orderResults[0]);

  const handleSortChange = (item: SortItem | undefined): void => {
    if (item) {
      setSelectedValue(item);
      setPageNumber(0);
      setEndReached(false);

      switch (item.value) {
        case 'newest':
          setOrderBy('tokenId');
          setOrderDirection('desc');
          break;
        case 'oldest':
          setOrderBy('tokenId');
          setOrderDirection('asc');
          break;
        case 'a-z':
          setOrderBy('name');
          setOrderDirection('asc');
          break;
        case 'z-a':
          setOrderBy('name');
          setOrderDirection('desc');
          break;
        default:
          break;
      }
    } else {
      AppLog.errorToast('Error selecting sort option. Try again');
    }
  };

  const handleSearch = useDebounce(
    (searchValue: string) => setSearch(searchValue),
    200
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleSearch(e.target.value);
  };

  return (
    <S.Container>
      <S.Data.Wrapper>
        <S.Data.Text>All NFAs&nbsp;</S.Data.Text>
        <S.Data.Number>(3,271)</S.Data.Number>
      </S.Data.Wrapper>

      <S.Input.Wrapper>
        <InputGroup css={{ flex: 1 }}>
          <S.Input.Icon name="search" />
          <InputGroupText placeholder="Search" onChange={handleSearchChange} />
        </InputGroup>
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
                  backgroundColor: '$slate4',
                  borderColor: '$slate4',
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
      </S.Input.Wrapper>
    </S.Container>
  );
};
