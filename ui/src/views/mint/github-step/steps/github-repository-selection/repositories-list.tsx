import React, { useEffect } from 'react';
import {
  Button,
  DropdownItem,
  Flex,
  NoResults,
  Separator,
  Spinner,
} from '@/components';
import { Mint, Repo } from '@/views/mint/mint.context';
import { useState } from 'react';
import { Loading, RepoRow } from './github-repository-selection';
import { useGithub } from '../use-github';
import { useQuery } from 'react-query';

type RepositoriesListProps = {
  setLoading: (loading: boolean) => void;
  isLoading: boolean;
  searchValue: string;
};

export const RepositoriesList = ({
  isLoading,
  setLoading,
  searchValue,
}: RepositoriesListProps) => {
  const {
    selectedUserOrg,
    setGithubStep,
    setRepositoryName,
    setRepositoryConfig,
  } = Mint.useContext();
  const { fetchRepos } = useGithub({
    onError: () => {
      //TODO show toast
      alert('Error fetching branches');
    },
  });
  const [repositories, setRepositories] = useState<Repo[]>([]);

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
    setRepositoryConfig({} as DropdownItem, '');
  };

  const { data: dataRepositories, status } = useQuery(
    `fetchRepos${selectedUserOrg.value}`,
    async () => fetchRepos(selectedUserOrg.value)
  );

  useEffect(() => {
    dataRepositories &&
      setRepositories(
        dataRepositories.map(
          (repo: any) => ({ name: repo.name, url: repo.url } as Repo)
        )
      );
  }, [dataRepositories]);

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'error') {
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
