import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';
import { AccessPointsListFragment } from './main-ap-list.fragment';
import { Header } from './main-header.fragment';

export const IndexedNFAMainFragment: React.FC = () => {
  return (
    <S.Main.Container>
      <Header />
      <AccessPointsListFragment />
    </S.Main.Container>
  );
};
