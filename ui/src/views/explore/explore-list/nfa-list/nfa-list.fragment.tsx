import { Text } from '@/components';
import { lastNFAsPaginatedQuery } from '@/graphclient';

import { NFAListFragmentStyles as S } from './nfa-list.styles';
import { NFARow } from './nfa-row.fragment';
import { NFARowSkeletonFragment } from './nfa-row.skeleton';

const LoadingListSkeleton: React.FC = () => (
  <>
    <NFARowSkeletonFragment />
    <NFARowSkeletonFragment />
    <NFARowSkeletonFragment />
  </>
);

type NFAListFragmentProps = {
  tokens: Array<lastNFAsPaginatedQuery['tokens'][0]>;
  isLoading: boolean;
};

export const NFAListFragment: React.FC<NFAListFragmentProps> = ({
  tokens,
  isLoading,
}: NFAListFragmentProps) => {
  return (
    <S.Table.Container>
      <S.Table.Root>
        <colgroup>
          <col span={1} />
          <col span={1} />
          <col span={1} />
        </colgroup>
        <S.Table.Head>
          <S.Table.Row>
            <S.Table.Data>NAME</S.Table.Data>
            <S.Table.Data># HOSTED</S.Table.Data>
            <S.Table.Data>Owner</S.Table.Data>
          </S.Table.Row>
        </S.Table.Head>
        <S.Table.Body>
          {tokens.map((token) => (
            <NFARow token={token} key={token.id} />
          ))}

          {isLoading && <LoadingListSkeleton />}

          {!isLoading && tokens.length === 0 && (
            <S.Table.Row>
              <S.Table.Data align="center" colSpan={5}>
                <Text>No results</Text>
              </S.Table.Data>
            </S.Table.Row>
          )}
        </S.Table.Body>
      </S.Table.Root>
    </S.Table.Container>
  );
};
