import { useNavigate } from 'react-router-dom';

import { Flex, NFAPreview, ResolvedAddress, Text } from '@/components';
import { lastNFAsPaginatedQuery } from '@/graphclient';
import { parseNumberToHexColor } from '@/utils/color';

import { NFAListFragmentStyles as S } from './nfa-list.styles';

type NFAsListViewProps = {
  accessPoints: Array<lastNFAsPaginatedQuery['tokens'][0]>;
};

export const NFAsListView: React.FC<NFAsListViewProps> = ({
  accessPoints,
}: NFAsListViewProps) => {
  const navigate = useNavigate();

  const handleClick = (id: string): void => {
    navigate(`/nfa/${id}`);
  };
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
          {accessPoints && accessPoints.length > 0 ? (
            accessPoints.map((item) => (
              <S.Table.Row
                key={item.id}
                onClick={() => handleClick(item.tokenId)}
              >
                <S.Table.Data>
                  <Flex
                    css={{
                      flexDirection: 'row',
                      gap: '$2',
                      alignItems: 'center',
                    }}
                  >
                    <NFAPreview
                      size="80px"
                      name={item.name}
                      color={`#${parseNumberToHexColor(item.color)}`}
                      logo={item.logo}
                      ens={item.ENS}
                    />
                    {item.name}
                  </Flex>
                </S.Table.Data>
                <S.Table.Data>{item.accessPoints?.length ?? 0}</S.Table.Data>
                <S.Table.Data>
                  <ResolvedAddress>{item.owner.id}</ResolvedAddress>
                </S.Table.Data>
              </S.Table.Row>
            ))
          ) : (
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
