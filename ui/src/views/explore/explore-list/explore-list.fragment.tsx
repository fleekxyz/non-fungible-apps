import { Explore } from '../explore.context';
import { NFAsContainerFragment } from './nfa-list';
import { NFASearchFragment } from './nfa-search.fragment';

export const ExploreListFragment: React.FC = () => {
  return (
    <Explore.Provider>
      <NFASearchFragment />
      <NFAsContainerFragment />
    </Explore.Provider>
  );
};
