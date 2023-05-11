import { IndexedNFAStyles as S } from '../indexed-nfa.styles';
import { SkeletonAccessPointsListFragment } from './main/skeleton.ap-list';

export const IndexedNFASkeletonFragment: React.FC = () => (
  <S.Grid css={{ justifyItems: 'normal' }}>
    <S.Aside.Container>
      <S.Skeleton css={{ aspectRatio: 1, width: '100%' }} />
    </S.Aside.Container>
    <S.Main.Container css={{ justifyContent: 'stretch' }}>
      <S.Skeleton css={{ height: '2.875rem' }} />
      <SkeletonAccessPointsListFragment />
    </S.Main.Container>
  </S.Grid>
);
