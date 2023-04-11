import { useState } from 'react';

import { Dropdown, DropdownItem, Flex, Input } from '@/components';

import { ResultsContainer, ResultsNumber, ResultsText } from './results.styles';

const orderResults: DropdownItem[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'a-z', label: 'Name A-Z' },
  { value: 'z-a', label: 'Name Z-A' },
];

export const ResultsSearch: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<DropdownItem>(
    orderResults[0]
  ); //TODO replace for context

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
