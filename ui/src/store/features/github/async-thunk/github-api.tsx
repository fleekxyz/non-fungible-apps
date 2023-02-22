import { ComboboxItem, DropdownItem } from '@/components';
import { githubActions, RootState } from '@/store';
import { useGithub } from '@/views/mint/github-step/steps/use-github';
import { Repo } from '@/views/mint/mint.context';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRepositoriesThunk = createAsyncThunk(
  'github/fetchRepositories',
  async (url: string, { dispatch, getState }) => {
    debugger;
    if ((getState() as RootState).github.queryLoading === 'loading') return;
    const { fetchRepos } = useGithub();

    try {
      dispatch(githubActions.setQueryState('loading'));

      const repositories = await fetchRepos(url);

      dispatch(
        githubActions.setRepositoires(
          repositories.map(
            (repo: any) => ({ name: repo.name, url: repo.url } as Repo)
          )
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(githubActions.setQueryState('failed'));
    }
  }
);

type FetchBranches = {
  owner: string;
  repository: string;
};

export const fetchBranchesThunk = createAsyncThunk<void, FetchBranches>(
  'github/fetchBranches',
  async ({ owner, repository }, { dispatch, getState }) => {
    if ((getState() as RootState).github.queryLoading === 'loading') return;
    const { fetchBranches } = useGithub();

    try {
      dispatch(githubActions.setQueryState('loading'));

      const branches = await fetchBranches(owner, repository);

      dispatch(githubActions.setBranches(branches as DropdownItem[]));
    } catch (error) {
      console.log(error);
      dispatch(githubActions.setQueryState('failed'));
    }
  }
);

export const fetchUserAndOrgsThunk = createAsyncThunk(
  'github/fetchUserAndOrgs',
  async (_, { dispatch, getState }) => {
    if ((getState() as RootState).github.queryLoading === 'loading') return;
    const { fetchUser, fetchOrgs } = useGithub();

    try {
      const user = await fetchUser();
      const orgs = await fetchOrgs();

      let comboboxItems: ComboboxItem[] = [];

      console.log(user);
      console.log(orgs);
    } catch (error) {
      console.log(error);
      dispatch(githubActions.setQueryState('failed'));
    }
  }
);
