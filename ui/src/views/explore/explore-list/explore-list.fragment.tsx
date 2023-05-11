import { Explore } from '../explore.context';
import { NFAListFragment } from './nfa-list';
import { NFASearchFragment } from './nfa-search.fragment';

export const ExploreListFragment: React.FC = () => {
  return (
    <Explore.Provider>
      <NFASearchFragment />
      <NFAListFragment />
    </Explore.Provider>
  );
};
