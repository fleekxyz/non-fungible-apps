import { createAsyncThunk } from '@reduxjs/toolkit';

import { ComboboxItem } from '@/components';
import { githubActions, RootState } from '@/store';
import { AppLog } from '@/utils';

import { GithubClient } from '../github-client';

type FetchBranches = {
  owner: string;
  repository: string;
};

export const fetchBranchesThunk = createAsyncThunk<void, FetchBranches>(
  'github/fetchBranches',
  async ({ owner, repository }, { dispatch, getState }) => {
    const { token, queryLoading } = (getState() as RootState).github;

    if (queryLoading === 'loading') return;

    try {
      dispatch(githubActions.setQueryState('loading'));

      const githubClient = new GithubClient(token);

      const branches = await githubClient.fetchBranches(owner, repository);

      dispatch(githubActions.setBranches(branches as ComboboxItem[]));
    } catch (error) {
      AppLog.errorToast(
        'We have a problem trying to get your branches. Please try again later.'
      );
      dispatch(githubActions.setQueryState('failed'));
    }
  }
);
