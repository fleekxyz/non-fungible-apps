import { Explore as ES } from './explore.styles';
import { ExploreHeaderFragment } from './explore-header';
import { ExploreListFragment } from './explore-list';

export const ExploreView: React.FC = () => {
  return (
    <ES.Container>
      <ExploreHeaderFragment />
      <ExploreListFragment />
    </ES.Container>
  );
};
