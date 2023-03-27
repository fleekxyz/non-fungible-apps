import { Flex, Input } from '@/components';
import { ResultsContainer, ResultsNumber, ResultsText } from './results.styles';

export const ResultsSearch: React.FC = () => {
  return (
    <Flex css={{ justifyContent: 'space-between' }}>
      <ResultsContainer>
        <ResultsText>All NFAs </ResultsText>
        <ResultsNumber>(3,271)</ResultsNumber>
      </ResultsContainer>
      <Input placeholder="Search" leftIcon="search" css={{ width: '23rem' }} />
    </Flex>
  );
};
