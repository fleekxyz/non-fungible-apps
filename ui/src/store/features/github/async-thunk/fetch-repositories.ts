import { githubActions, Repository, RootState } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GithubClient } from '../github-client';

export const fetchRepositoriesThunk = createAsyncThunk(
  'github/fetchRepositories',
  async (url: string, { dispatch, getState }) => {
    if ((getState() as RootState).github.queryLoading === 'loading') return;

    try {
      dispatch(githubActions.setQueryState('loading'));

      const githubClient = new GithubClient(
        (getState() as RootState).github.token
      );

      const repositories = await githubClient.fetchRepos(url);

      dispatch(
        githubActions.setRepositoires(
          repositories.map(
            (repo: any) => ({ name: repo.name, url: repo.url } as Repository)
          )
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(githubActions.setQueryState('failed'));
    }
  }
);
