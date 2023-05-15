import { useCallback, useEffect } from 'react';

import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { ButtonConnection } from '@/views/mint/button-connection';
import { Mint } from '@/views/mint/mint.context';

export const GithubButton: React.FC = () => {
  const { state } = useGithubStore();
  const dispatch = useAppDispatch();
  const { setGithubStep } = Mint.useContext();

  const handleGithubLogin = useCallback(() => {
    dispatch(githubActions.login());
  }, [dispatch]);

  useEffect(() => {
    if (state === 'connected') setGithubStep(2);
  }, [setGithubStep, state]);

  return (
    <ButtonConnection
      icon={'github'}
      label={'GitHub'}
      onClick={handleGithubLogin}
      disabled={state === 'loading'}
    />
  );
};
