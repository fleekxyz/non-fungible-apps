import { useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { useEffect } from 'react';

import Rectangle1 from '@/assets/Rectangle-199.png';
import { Flex, ResolvedAddress, Text } from '@/components';
import {
  AccessPoint as AccessPointType,
  getAccessPointsNFADocument,
  Owner,
} from '@/graphclient';
import { useWindowScrollEnd } from '@/hooks';
import { AppLog, getTimeSince } from '@/utils';

import { IndexedNFA } from '../../indexed-nfa.context';
import { IndexedNFAStyles as S } from '../../indexed-nfa.styles';
import { SkeletonAccessPointsListFragment } from './skeleton.ap-list';

type AccessPointProps = {
  data: Pick<AccessPointType, 'id' | 'contentVerified' | 'createdAt'> & {
    owner: Pick<Owner, 'id'>;
  };
};

const AccessPoint: React.FC<AccessPointProps> = ({
  data,
}: AccessPointProps) => {
  const { id: name, owner, createdAt } = data;
  return (
    <S.Main.AccessPoint.Grid>
      <S.Main.AccessPoint.Thumbnail>
        {/* TODO remove for real image */}
        <img src={Rectangle1} style={{ width: '7rem' }} />
      </S.Main.AccessPoint.Thumbnail>
      <S.Main.AccessPoint.Data.Container>
        <S.Main.AccessPoint.Title>{name}</S.Main.AccessPoint.Title>
        <Flex css={{ gap: '$2h', alignItems: 'center', textAlign: 'center' }}>
          <Text css={{ color: '$slate11' }}>
            <ResolvedAddress>{owner.id}</ResolvedAddress>
          </Text>
          <S.Main.Divider.Elipse />
          {/* TODO get from bunny CDN */}
          <Text css={{ color: '$slate11' }}>220 views</Text>
          <S.Main.Divider.Elipse />
          <Text css={{ color: '$slate11' }}>{getTimeSince(createdAt)}</Text>
        </Flex>
      </S.Main.AccessPoint.Data.Container>
    </S.Main.AccessPoint.Grid>
  );
};

const pageSize = 10; //Set this size to test pagination

export const AccessPointsListFragment: React.FC = () => {
  const {
    nfa: { tokenId },
    orderDirection,
    pageNumber,
    endReached,
    setEndReached,
    setPageNumber,
  } = IndexedNFA.useContext();

  const handleError = (error: unknown): void => {
    AppLog.errorToast(
      'There was an error trying to get the access points',
      error
    );
  };

  const {
    loading: isLoading,
    data: { accessPoints } = { accessPoints: [] },
    error: queryError,
  } = useQuery(getAccessPointsNFADocument, {
    skip: tokenId === undefined,
    fetchPolicy: 'cache-and-network',
    variables: {
      tokenId: ethers.utils.hexlify(Number(tokenId)),
      orderDirection: orderDirection,
      orderBy: 'createdAt',
      pageSize,
      skip: pageNumber * pageSize, //skip is for the pagination
    },
    onCompleted(data) {
      if (data.accessPoints.length - accessPoints.length < pageSize)
        setEndReached(true);
    },
    onError(error) {
      handleError(error);
    },
  });

  useEffect(() => {
    // Update page number when there are cached tokens
    setPageNumber(Math.ceil(accessPoints.length / pageSize));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useWindowScrollEnd(() => {
    if (isLoading || endReached || queryError) return;
    setPageNumber(pageNumber + 1);
  });

  return (
    <S.Main.AccessPoint.List>
      {accessPoints.map((item, index) => (
        <AccessPoint key={index} data={item} />
      ))}
      {isLoading && <SkeletonAccessPointsListFragment />}
      {!isLoading && accessPoints.length === 0 && (
        <S.Main.AccessPoint.NoResults>
          <h2>No hosted NFAs</h2>
        </S.Main.AccessPoint.NoResults>
      )}
    </S.Main.AccessPoint.List>
  );
};
