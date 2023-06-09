import { IndexedNFAStyles as S } from '../indexed-nfa.styles';
import { SkeletonAccessPointsListFragment } from './main/skeleton.ap-list';

export const IndexedNFASkeletonFragment: React.FC = () => (
  <S.Grid css={{ justifyItems: 'normal' }}>
    <S.Skeleton
      css={{ aspectRatio: 1, width: '20rem', justifySelf: 'center' }}
    />
    <S.Main.Container css={{ justifyContent: 'stretch' }}>
      <S.Skeleton css={{ height: '2.875rem' }} />
      <SkeletonAccessPointsListFragment />
    </S.Main.Container>
  </S.Grid>
);
