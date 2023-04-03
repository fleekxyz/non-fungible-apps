import { Flex } from '@/components';
import { NFAList } from './nfa-list';
import { ResultsSearch } from './results-search';

export const ListNfas: React.FC = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <ResultsSearch />
      <NFAList />
    </Flex>
  );
};
