import { NFACardStyles as S } from './nfa-card.styles';

export const NFACardSkeleton: React.FC = () => {
  return (
    <S.Container as="div">
      <S.Skeleton.Preview />
      <S.Body>
        <S.Skeleton.Title />
        <S.Skeleton.Content />
      </S.Body>
    </S.Container>
  );
};
