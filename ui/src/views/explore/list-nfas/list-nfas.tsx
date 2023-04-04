import { Flex } from '@/components';

import { Explore } from '../explore.context';
import { NFAList } from './nfa-list';
import { ResultsSearch } from './results-search';

export const ListNfas: React.FC = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <Explore.Provider>
        <ResultsSearch />
        <NFAList />
      </Explore.Provider>
    </Flex>
  );
};
