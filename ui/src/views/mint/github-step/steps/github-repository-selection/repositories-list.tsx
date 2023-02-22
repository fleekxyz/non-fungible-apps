import React, { useEffect } from 'react';
import { Button, Flex, NoResults, Separator } from '@/components';
import { Mint, Repo } from '@/views/mint/mint.context';
import { Loading, RepoRow } from './github-repository-selection';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';

type RepositoriesListProps = {
  searchValue: string;
};

export const RepositoriesList = ({ searchValue }: RepositoriesListProps) => {
  const {
    selectedUserOrg,
    setGithubStep,
    setRepositoryName,
    setBranchName,
    setCommitHash,
  } = Mint.useContext();
  const { queryLoading, repositories } = useGithubStore();
  const dispatch = useAppDispatch();

  const filteredRepositories =
    searchValue === ''
      ? repositories
      : repositories.filter(
          (item) =>
            item.name.toUpperCase().indexOf(searchValue.toUpperCase()) != -1
        );

  const handleSelectRepo = (repo: Repo) => {
    setRepositoryName(repo);
    setGithubStep(3);
    // setBranchName({} as DropdownItem);
    // setCommitHash('');
    dispatch(githubActions.setQueryState('idle'));
  };

  if (queryLoading === 'idle' && selectedUserOrg.value) {
    dispatch(githubActions.fetchRepositoriesThunk(selectedUserOrg.value));
  }

  // if (queryLoading === 'loading') {
  //   return <Loading />;
  // }

  if (queryLoading === 'failed') {
    return <span>Error</span>;
  }

  return (
    <Flex
      css={{
        height: '$60',
        overflowX: 'hidden',
        overflowY: 'scroll',
        flexDirection: 'column',
      }}
    >
      {filteredRepositories.length > 0 ? (
        filteredRepositories.map((repo, index, { length }) => (
          <React.Fragment key={repo.name}>
            <RepoRow
              repo={repo.name}
              button={
                <Button
                  colorScheme="blue"
                  variant="outline"
                  css={{ py: '$1', height: '$5', borderRadius: '$md' }}
                  onClick={() => handleSelectRepo(repo)}
                >
                  Use for NFA
                </Button>
              }
            />
            {index < length - 1 && <Separator />}
          </React.Fragment>
        ))
      ) : (
        <NoResults css="text-center" />
      )}
    </Flex>
  );
};
