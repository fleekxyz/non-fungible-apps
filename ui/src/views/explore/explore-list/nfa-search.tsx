import { useState } from 'react';

import { Dropdown, DropdownItem, Flex, Input } from '@/components';
import { useDebounce } from '@/hooks';

import { Explore } from '../explore.context';
import { ResultsContainer, ResultsNumber, ResultsText } from './results.styles';

const orderResults: DropdownItem[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Name A-Z' },
  { value: 'z-a', label: 'Name Z-A' },
];

export const NFASearchFragment: React.FC = () => {
  const {
    setEndReached,
    setOrderBy,
    setOrderDirection,
    setSearch,
    setPageNumber,
  } = Explore.useContext();
  const [selectedValue, setSelectedValue] = useState<DropdownItem>(
    orderResults[0]
  );

  const handleSortChange = (item: DropdownItem): void => {
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
  };

  const handleSearch = useDebounce(
    (searchValue: string) => setSearch(searchValue),
    200
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleSearch(e.target.value);
  };

  return (
    <Flex css={{ justifyContent: 'space-between' }}>
      <ResultsContainer>
        <ResultsText>All NFAs </ResultsText>
        <ResultsNumber>(3,271)</ResultsNumber>
      </ResultsContainer>
      <Flex css={{ gap: '$3' }}>
        <Input
          placeholder="Search"
          leftIcon="search"
          css={{ width: '23rem' }}
          onChange={handleSearchChange}
        />
        <Dropdown
          items={orderResults}
          selectedValue={selectedValue}
          onChange={handleSortChange}
          backgroundColor="slate4"
          textColor="slate11"
          optionsWidth="40"
        />
      </Flex>
    </Flex>
  );
};
