import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@/store';
import { AppLog } from '@/utils';

import { GithubClient } from '../github-client';
import { githubActions } from '../github-slice';

export const fetchUserAndOrgsThunk = createAsyncThunk(
  'github/fetchUserAndOrgs',
  async (_, { dispatch, getState }) => {
    const { token, queryUserAndOrganizations } = (getState() as RootState)
      .github;

    if (queryUserAndOrganizations === 'loading') return;

    try {
      dispatch(githubActions.setQueryUserState('loading'));

      const githubClient = new GithubClient(token);

      const [userResponse, orgsResponse] = await Promise.all([
        githubClient.fetchUser(),
        githubClient.fetchOrgs(),
      ]);

      const items: GithubClient.UserData[] = [];

      if (userResponse) {
        items.push(userResponse);
      }

      if (orgsResponse) {
        items.push(...orgsResponse);
      }

      dispatch(githubActions.setUserAndOrgs(items));
    } catch (error) {
      AppLog.errorToast('We have a problem. Please try again later.');
      dispatch(githubActions.setQueryState('failed'));
    }
  }
);
