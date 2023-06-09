import { Flex } from '@/components';

import { NFAListFragmentStyles as S } from './nfa-list.styles';

export const NFARowSkeletonFragment: React.FC = () => (
  <S.Table.Row>
    <S.Table.Data>
      <Flex
        css={{
          flexDirection: 'row',
          gap: '$3',
          alignItems: 'center',
        }}
      >
        <S.Skeleton css={{ aspectRatio: 1, width: '5rem' }} />
        <S.Skeleton css={{ height: '2rem', width: '100%' }} />
      </Flex>
    </S.Table.Data>
    <S.Table.Data>
      <S.Skeleton css={{ height: '2rem' }} />
    </S.Table.Data>
    <S.Table.Data>
      <S.Skeleton css={{ height: '2rem' }} />
    </S.Table.Data>
  </S.Table.Row>
);
