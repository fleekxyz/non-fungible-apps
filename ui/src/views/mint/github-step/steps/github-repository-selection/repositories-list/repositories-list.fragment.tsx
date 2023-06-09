import { useEffect, useMemo } from 'react';

import { githubActions, useAppDispatch, useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';

import { RepositoiresListStyles as S } from './repositories-list.styles';
import { Repository } from './repository';

type RepositoriesListProps = {
  searchValue: string;
};

export const RepositoriesListFragment: React.FC<RepositoriesListProps> = ({
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
    <S.Container>
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
        <S.Message>Nothing found.</S.Message>
      )}
    </S.Container>
  );
};
