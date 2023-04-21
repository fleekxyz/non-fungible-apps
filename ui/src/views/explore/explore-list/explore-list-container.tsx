import { Explore } from '../explore.context';
import { NFAListFragment } from './nfa-list.fragment';
import { NFASearchFragment } from './nfa-search.fragment';

export const ExploreListContainer: React.FC = () => {
  return (
    <Explore.Provider>
      <NFASearchFragment />
      <NFAListFragment />
    </Explore.Provider>
  );
};
