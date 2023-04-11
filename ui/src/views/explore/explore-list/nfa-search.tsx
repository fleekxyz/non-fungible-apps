import { useState } from 'react';

import { Dropdown, DropdownItem, Flex, Input } from '@/components';
import { useDebounce } from '@/hooks';

import { Explore } from '../explore.context';
import { ResultsContainer, ResultsNumber, ResultsText } from './results.styles';

const orderResults: DropdownItem[] = [
  { value: 'a-z', label: 'Sort A-Z' },
  { value: 'z-a', label: 'Sort Z-A' },
];

export const NFASearchFragment: React.FC = () => {
  const { setSearch } = Explore.useContext();
  const [selectedValue, setSelectedValue] = useState<DropdownItem>(
    orderResults[0]
  ); //TODO replace for context

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
          onChange={setSelectedValue}
          backgroundColor="slate4"
          textColor="slate11"
          optionsWidth="40"
        />
      </Flex>
    </Flex>
  );
};
