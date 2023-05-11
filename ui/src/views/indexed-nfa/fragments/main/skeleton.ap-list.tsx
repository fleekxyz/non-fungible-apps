import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';

const SkeletonAccessPoint: React.FC = () => (
  <S.Main.AccessPoint.Grid>
    <S.Main.AccessPoint.Thumbnail>
      <S.Skeleton css={{ height: '6rem' }} />
    </S.Main.AccessPoint.Thumbnail>
    <S.Main.AccessPoint.Data.Container>
      <S.Skeleton css={{ height: '2rem' }} />
      <S.Skeleton css={{ height: '1.25rem' }} />
    </S.Main.AccessPoint.Data.Container>
  </S.Main.AccessPoint.Grid>
);

export const SkeletonAccessPointsListFragment: React.FC = () => (
  <S.Main.AccessPoint.List>
    <SkeletonAccessPoint />
    <SkeletonAccessPoint />
    <SkeletonAccessPoint />
  </S.Main.AccessPoint.List>
);
