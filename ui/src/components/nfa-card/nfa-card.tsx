import { useMemo } from 'react';
import { To } from 'react-router-dom';

import { NFAPreview } from '@/components';
import { lastNFAsPaginatedQuery } from '@/graphclient';
import { forwardStyledRef } from '@/theme';

import { Flex } from '../layout';
import { NFACardStyles as S } from './nfa-card.styles';

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

export type NFACardProps = Omit<
  React.ComponentPropsWithRef<typeof S.Container>,
  'to'
> & {
  data: lastNFAsPaginatedQuery['tokens'][0];
  to?: To;
};

export const NFACard: React.FC<NFACardProps> = forwardStyledRef<
  HTMLAnchorElement,
  NFACardProps
>(({ data, to = `/nfa/${data.tokenId}`, ...props }, ref) => {
  const { name, color, ENS, logo, accessPoints } = data;

  const apCounter = useMemo(() => accessPoints?.length ?? 0, [accessPoints]);

  const parsedColor = useMemo(
    () => `#${('000000' + color.toString(16)).slice(-6)}`,
    [color]
  );

  return (
    <S.Container ref={ref} to={to} {...props}>
      <NFAPreview
        size="100%"
        name={name}
        color={parsedColor}
        logo={logo}
        ens={ENS}
      />

      <S.Body>
        <Flex
          css={{
            gap: '$2',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* TODO: treat names bigger than space in layout when designs are done */}
          <S.Title>{data.name}</S.Title>
          {/* TODO: set correct value when it gets available on contract side */}
          <Badge verified={Math.random() > 0.5} />
        </Flex>

        <Flex css={{ gap: '$1' }}>
          <S.Content highlight>{apCounter}</S.Content>
          <S.Content>Access Points</S.Content>
        </Flex>
      </S.Body>
    </S.Container>
  );
});
