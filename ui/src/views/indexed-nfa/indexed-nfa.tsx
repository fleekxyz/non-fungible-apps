import { useQuery } from '@apollo/client';
import { ethers } from 'ethers';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { App } from '@/app.context';
import { getNFADetailDocument } from '@/graphclient';
import { AppLog } from '@/utils';
import { parseNumberToHexColor } from '@/utils/color';

import {
  IndexedNFAAsideFragment,
  IndexedNFAMainFragment,
  IndexedNFASkeletonFragment,
} from './fragments';
import { IndexedNFA } from './indexed-nfa.context';
import { IndexedNFAStyles as S } from './indexed-nfa.styles';

export const IndexedNFAView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { setBackgroundColor } = App.useContext();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      setBackgroundColor('000000');
    };
  }, [setBackgroundColor]);

  const handleError = (error: unknown): void => {
    AppLog.errorToast(
      `It was not possible to find the NFA with id "${id}"`,
      error
    );
    navigate('/', { replace: true });
  };

  const { loading, data = { token: {} } } = useQuery(getNFADetailDocument, {
    skip: id === undefined,
    variables: {
      id: ethers.utils.hexlify(Number(id)),
    },
    onCompleted(data) {
      if (!data.token) handleError(new Error('Token not found'));
      if (data.token?.color)
        setBackgroundColor(parseNumberToHexColor(data.token.color));
    },
    onError(error) {
      handleError(error);
    },
  });

  if (loading) {
    return <IndexedNFASkeletonFragment />;
  }

  return (
    <IndexedNFA.Provider nfa={data.token}>
      <S.Grid>
        <IndexedNFAAsideFragment />
        <IndexedNFAMainFragment />
      </S.Grid>
    </IndexedNFA.Provider>
  );
};
