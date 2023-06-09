import { NFACard, NFACardSkeleton } from '@/components';
import { lastNFAsPaginatedQuery } from '@/graphclient';

import { NFAListFragmentStyles as S } from './nfa-list.styles';

const LoadingSkeletons: React.FC = () => (
  <>
    <NFACardSkeleton />
    <NFACardSkeleton />
    <NFACardSkeleton />
    <NFACardSkeleton />
    <NFACardSkeleton />
    <NFACardSkeleton />
  </>
);

type NFAGridFragmentProps = {
  tokens: Array<lastNFAsPaginatedQuery['tokens'][0]>;
  isLoading: boolean;
};

export const NFAGridFragment: React.FC<NFAGridFragmentProps> = ({
  tokens,
  isLoading,
}: NFAGridFragmentProps) => (
  <S.Container>
    {tokens.map((token) => (
      <NFACard data={token} key={token.id} />
    ))}

    {isLoading && <LoadingSkeletons />}

    {!isLoading && tokens.length === 0 && (
      <S.EmptyMessage>Nothing found.</S.EmptyMessage>
    )}
  </S.Container>
);
