import { Header } from './header';
import { Explore as ES } from './explore.styles';
import { ListNfas } from './list-nfas/list-nfas';

export const Explore: React.FC = () => {
  return (
    <ES.Container>
      <Header />
      <ListNfas />
    </ES.Container>
  );
};
