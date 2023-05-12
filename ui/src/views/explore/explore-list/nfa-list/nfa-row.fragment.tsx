import { useNavigate } from 'react-router-dom';

import { Flex, NFAPreview, ResolvedAddress } from '@/components';
import { lastNFAsPaginatedQuery } from '@/graphclient';
import { parseNumberToHexColor } from '@/utils/color';

import { NFAListFragmentStyles as S } from './nfa-list.styles';

type NFARowProps = {
  token: lastNFAsPaginatedQuery['tokens'][0];
};

export const NFARow: React.FC<NFARowProps> = ({ token }: NFARowProps) => {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate(`/nfa/${token.tokenId}`);
  };

  return (
    <S.Table.Row onClick={handleClick}>
      <S.Table.Data>
        <Flex
          css={{
            flexDirection: 'row',
            gap: '$2',
            alignItems: 'center',
          }}
        >
          <NFAPreview
            css={{
              borderRadius: '$lg',
              borderWidth: '1px',
              borderColor: `#${parseNumberToHexColor(token.color)}`,
            }}
            size="5rem"
            name={token.name}
            color={`#${parseNumberToHexColor(token.color)}`}
            logo={token.logo}
            ens={token.ENS}
          />
          {token.name}
        </Flex>
      </S.Table.Data>
      <S.Table.Data>{token.accessPoints?.length ?? 0}</S.Table.Data>
      <S.Table.Data>
        {/* TODO add menu button once the component it's added */}
        <ResolvedAddress>{token.owner.id}</ResolvedAddress>
      </S.Table.Data>
    </S.Table.Row>
  );
};
