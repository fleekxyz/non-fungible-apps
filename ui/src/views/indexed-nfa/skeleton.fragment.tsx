import { IndexedNFAStyles as S } from './indexed-nfa.styles';

export const IndexedNFASkeletonFragment: React.FC = () => (
  <S.Grid>
    <S.Aside.Container>
      <S.Skeleton css={{ aspectRatio: 1, width: '100%' }} />
    </S.Aside.Container>
    <S.Main.Container css={{ justifyContent: 'stretch' }}>
      <S.Skeleton css={{ height: '2.875rem' }} />
      <S.Skeleton css={{ height: '1.5rem' }} />
      <S.Main.Divider.Line />
      <S.Skeleton css={{ height: '10rem' }} />
      <S.Skeleton css={{ height: '15rem' }} />
    </S.Main.Container>
  </S.Grid>
);
