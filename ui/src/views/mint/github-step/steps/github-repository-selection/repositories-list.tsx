import { useEffect, useMemo } from 'react';

import { Flex } from '@/components';
import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';

import { Repository } from './repository';

type RepositoriesListProps = {
  searchValue: string;
};

export const RepositoriesList: React.FC<RepositoriesListProps> = ({
  searchValue,
}: RepositoriesListProps) => {
  const { selectedUserOrg } = Mint.useContext();
  const { queryLoading, repositories } = useGithubStore();
  const dispatch = useAppDispatch();

  const filteredRepositories = useMemo(() => {
    return searchValue === ''
      ? repositories
      : repositories.filter(
          (item) =>
            item.name.toUpperCase().indexOf(searchValue.toUpperCase()) != -1
        );
  }, [searchValue, repositories]);

  useEffect(() => {
    if (queryLoading === 'idle' && selectedUserOrg?.value) {
      dispatch(githubActions.fetchRepositoriesThunk(selectedUserOrg.value));
    }
  }, [queryLoading, dispatch, selectedUserOrg]);

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
        pr: '$3h',
      }}
    >
      {filteredRepositories.length > 0 ? (
        filteredRepositories.map((repo, index, { length }) => (
          <Repository
            key={repo.name}
            repository={repo}
            index={index}
            length={length}
          />
        ))
      ) : (
        // TODO: update this after designs are done
        <div
          className={`relative cursor-default select-none pt-2 px-3.5 pb-4 text-slate11 text-center`}
        >
          Nothing found.
        </div>
      )}
    </Flex>
  );
};
