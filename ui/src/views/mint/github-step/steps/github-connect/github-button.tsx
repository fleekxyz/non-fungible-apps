import { Button, Icon } from '@/components';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { useCallback } from 'react';

export const GithubButton = () => {
  const { state } = useGithubStore();
  const dispatch = useAppDispatch();
  const { setGithubStep } = Mint.useContext();

  const handleGithubLogin = useCallback(() => {
    dispatch(githubActions.login())
      .then(() => setGithubStep(2))
      .catch((error) => {
        //TODO show toast with error message
        console.log(error);
      });
  }, [dispatch]);

  return (
    <Button
      iconSpacing="59"
      size="lg"
      variant="ghost"
      css={{
        backgroundColor: '$slate4',
        color: '$slate12',
        py: '$2h',
      }}
      onClick={handleGithubLogin}
      disabled={state === 'loading'}
      rightIcon={
        <Icon name="github" css={{ color: 'white', fontSize: '$4xl' }} />
      }
    >
      GitHub
    </Button>
  );
};
