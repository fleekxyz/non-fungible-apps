import { createAsyncThunk } from '@reduxjs/toolkit';

import { githubActions, RootState } from '@/store';
import { AppLog } from '@/utils';

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

      dispatch(githubActions.setRepositories(repositories));
    } catch (error) {
      AppLog.errorToast('Failed to fetch repositories. Please try again.');
      dispatch(githubActions.setQueryState('failed'));
    }
  }
);
