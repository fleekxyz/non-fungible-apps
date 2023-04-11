import { Flex } from '@/components';

import { Explore } from '../explore.context';
import { NFAListFragment } from './nfa-list';
import { ResultsSearchFragment } from './results-search';

export const ExploreListContainer: React.FC = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <Explore.Provider>
        <ResultsSearchFragment />
        <NFAListFragment />
      </Explore.Provider>
    </Flex>
  );
};
