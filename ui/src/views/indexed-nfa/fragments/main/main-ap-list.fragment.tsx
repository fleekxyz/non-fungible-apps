import Rectangle1 from '@/assets/Rectangle-199.png';
import Rectangle2 from '@/assets/Rectangle-200.png';
import Rectangle3 from '@/assets/Rectangle-201.png';
import { Flex, ResolvedAddress, Text } from '@/components';
import { getTimeSince } from '@/utils';

import { IndexedNFA } from '../../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';

//TODO remove
const thumbnailMocks = [Rectangle1, Rectangle2, Rectangle3];

export const AccessPointsListFragment: React.FC = () => {
  const {
    nfa: { accessPoints },
  } = IndexedNFA.useContext();

  return (
    <S.Main.AccessPoint.List>
      {accessPoints && accessPoints?.length > 0 ? (
        accessPoints.map((item, index) => (
          <S.Main.AccessPoint.Grid key={index}>
            <S.Main.AccessPoint.Thumbnail>
              <img
                src={
                  thumbnailMocks[
                    Math.floor(
                      Math.random() * (Math.floor(2) - Math.ceil(0) + 1) +
                        Math.ceil(0)
                    )
                  ]
                }
              />
            </S.Main.AccessPoint.Thumbnail>
            <S.Main.AccessPoint.Data.Container>
              <S.Main.AccessPoint.Title>{item.id}</S.Main.AccessPoint.Title>
              <Flex
                css={{ gap: '$2h', alignItems: 'center', textAlign: 'center' }}
              >
                <Text css={{ color: '$slate11' }}>
                  <ResolvedAddress>{item.owner.id}</ResolvedAddress>
                </Text>
                <S.Main.Divider.Elipse />
                {/* TODO get from bunny CDN */}
                <Text css={{ color: '$slate11' }}>220 views</Text>
                <S.Main.Divider.Elipse />
                <Text css={{ color: '$slate11' }}>
                  {getTimeSince(item.createdAt)}
                </Text>
              </Flex>
            </S.Main.AccessPoint.Data.Container>
          </S.Main.AccessPoint.Grid>
        ))
      ) : (
        <S.Main.AccessPoint.NoResults>
          <h2>No hosted NFAs</h2>
        </S.Main.AccessPoint.NoResults>
      )}
    </S.Main.AccessPoint.List>
  );
};
