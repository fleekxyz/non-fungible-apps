import { Flex } from '@/components';

import { Explore } from '../explore.context';
import { NFAListFragment } from './nfa-list';
import { NFASearchFragment } from './nfa-search';

export const ExploreListContainer: React.FC = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <Explore.Provider>
        <NFASearchFragment />
        <NFAListFragment />
      </Explore.Provider>
    </Flex>
  );
};
