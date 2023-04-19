import { useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { useNavigate, useParams } from 'react-router-dom';

import { getNFADocument } from '@/graphclient';
import { AppLog } from '@/utils';

import {
  IndexedNFAAsideFragment,
  IndexedNFAMainFragment,
  IndexedNFASkeletonFragment,
} from './fragments';
import { IndexedNFA } from './indexed-nfa.context';
import { IndexedNFAStyles as S } from './indexed-nfa.styles';

export const IndexedNFAView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleError = (error: unknown): void => {
    AppLog.errorToast(
      `It was not possible to find the NFA with id "${id}"`,
      error
    );
    navigate('/', { replace: true });
  };

  const { loading } = useQuery(getNFADocument, {
    skip: id === undefined,
    variables: {
      id: ethers.utils.hexlify(Number(id)),
    },
    onCompleted(data) {
      if (!data.token) handleError(new Error('Token not found'));
    },
    onError(error) {
      handleError(error);
    },
  });

  if (loading) {
    return <IndexedNFASkeletonFragment />;
  }

  return (
    <IndexedNFA.Provider>
      <S.Grid>
        <IndexedNFAAsideFragment />
        <IndexedNFAMainFragment />
      </S.Grid>
    </IndexedNFA.Provider>
  );
};
