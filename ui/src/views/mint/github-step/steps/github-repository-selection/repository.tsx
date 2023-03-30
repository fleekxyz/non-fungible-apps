import { Button, Separator } from '@/components';
import { githubActions, GithubState, useAppDispatch } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { useCallback } from 'react';
import { RepoRow } from '../repository-row';

type RepositoryProps = {
  repository: GithubState.Repository;
  index: number;
  length: number;
};
export const Repository = ({ repository, index, length }: RepositoryProps) => {
  const { setGithubStep, setRepositoryName } = Mint.useContext();

  const dispatch = useAppDispatch();

  const handleSelectRepo = useCallback(() => {
    setRepositoryName(repository);
    setGithubStep(3);
    dispatch(githubActions.setQueryState('idle'));
  }, [dispatch]);

  return (
    <>
      <RepoRow
        onClick={handleSelectRepo}
        repo={repository.name}
        button={
          <Button
            colorScheme="blue"
            variant="outline"
            css={{ py: '$1', height: '$5', borderRadius: '$md' }}
          >
            Use for NFA
          </Button>
        }
      />
      {index < length - 1 && <Separator />}
    </>
  );
};
