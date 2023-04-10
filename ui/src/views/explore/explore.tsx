import { Explore as ES } from './explore.styles';
import { Header } from './header';
import { ListNfas } from './list-nfas';

export const Explore: React.FC = () => {
  return (
    <ES.Container>
      <Header />
      <ListNfas />
    </ES.Container>
  );
};
