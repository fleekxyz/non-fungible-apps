import { Explore as ES } from './explore.styles';
import { ExploreHeader } from './explore-header';
import { ExploreListContainer } from './explore-list';

export const Explore: React.FC = () => {
  return (
    <ES.Container>
      <ExploreHeader />
      <ExploreListContainer />
    </ES.Container>
  );
};
