import { IndexedNFAAsideFragment } from './aside.fragment';
import { IndexedNFA } from './indexed-nfa.context';
import { IndexedNFAStyles as S } from './indexed-nfa.styles';
import { IndexedNFAMainFragment } from './main.fragment';

export const IndexedNFAView: React.FC = () => {
  return (
    <IndexedNFA.Provider>
      <S.Grid>
        <IndexedNFAAsideFragment />
        <IndexedNFAMainFragment />
      </S.Grid>
    </IndexedNFA.Provider>
  );
};
