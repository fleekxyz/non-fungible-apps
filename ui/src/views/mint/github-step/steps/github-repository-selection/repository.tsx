import { useCallback } from 'react';

import { Button, Icon, RowData, Separator } from '@/components';
import { githubActions, GithubState, useAppDispatch } from '@/store';
import { Mint } from '@/views/mint/mint.context';

type RepositoryProps = {
  repository: GithubState.Repository;
  index: number;
  length: number;
};
export const Repository: React.FC<RepositoryProps> = ({
  repository,
  index,
  length,
}: RepositoryProps) => {
  const { setGithubStep, setRepositoryName } = Mint.useContext();

  const dispatch = useAppDispatch();

  const handleSelectRepo = useCallback(() => {
    setRepositoryName(repository);
    setGithubStep(3);
    dispatch(githubActions.setQueryState('idle'));
  }, [dispatch, repository, setGithubStep, setRepositoryName]);

  return (
    <>
      <RowData
        leftIcon={<Icon name="github" />}
        label={repository.name}
        css={{ cursor: 'pointer', my: '$4' }}
        rightComponent={
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={handleSelectRepo}
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
