import { useMemo } from 'react';

import { forwardStyledRef } from '@/theme';

import { Flex } from '../layout';
import { NFACardStyles as S } from './nfa-card.styles';

type NFACardProps = React.ComponentPropsWithRef<typeof S.Container> & {
  data: any;
};

type BadgeProps = {
  verified: boolean;
};

const Badge: React.FC<BadgeProps> = ({ verified }: BadgeProps) => {
  const text = useMemo(
    () => (verified ? 'Verified' : 'Unverified'),
    [verified]
  );

  return <S.Badge verified={verified}>{text}</S.Badge>;
};

export const NFACard: React.FC<NFACardProps> = forwardStyledRef<
  HTMLDivElement,
  NFACardProps
>(({ data, ...props }, ref) => {
  return (
    <S.Container ref={ref} {...props}>
      <S.Preview />

      <S.Body>
        <Flex css={{ gap: '0.5rem', justifyContent: 'space-between' }}>
          <S.Title>{data.title}</S.Title>
          <Badge verified={data.verified} />
        </Flex>

        <Flex css={{ gap: '0.25rem' }}>
          <S.Content highlight>{data.accessPoints}</S.Content>
          <S.Content>Access Points</S.Content>
        </Flex>
      </S.Body>
    </S.Container>
  );
});
