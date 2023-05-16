import { useMemo } from 'react';

import { Flex, Icon, NFAIcon, ResolvedAddress } from '@/components';

import { IndexedNFA } from '../../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';

type BadgeProps = {
  verified: boolean;
};

const Badge: React.FC<BadgeProps> = ({ verified }: BadgeProps) => {
  const text = useMemo(
    () => (verified ? 'Verified' : 'Unverified'),
    [verified]
  );

  const icon = useMemo(() => (verified ? 'verified' : 'error'), [verified]);
  const color = useMemo(() => (verified ? '$green10' : '$red10'), [verified]);
  return (
    <S.Aside.Header.Badge verified={verified}>
      <Icon name={icon} css={{ color: color }} />
      {text}
    </S.Aside.Header.Badge>
  );
};

export const Header: React.FC = () => {
  const { nfa } = IndexedNFA.useContext();

  return (
    <S.Aside.Header.Wrapper>
      <S.Aside.Header.Container>
        <S.Aside.Header.Header>{nfa.name}</S.Aside.Header.Header>
        <Badge verified={nfa.verified} />
      </S.Aside.Header.Container>

      <Flex css={{ gap: '$1h' }}>
        <NFAIcon image={nfa.logo} color={'white'} />
        <ResolvedAddress>{nfa.owner.id}</ResolvedAddress>
      </Flex>
    </S.Aside.Header.Wrapper>
  );
};
