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

      const response = await Promise.all([
        githubClient.fetchUser(),
        githubClient.fetchOrgs(),
      ]);
      const userResponse = response[0];
      const orgsResponse = response[1];

      let comboboxItems: GithubClient.UserData[] = [];

      if (userResponse) {
        comboboxItems.push(userResponse);
      }

      if (orgsResponse) {
        comboboxItems = [...comboboxItems, ...orgsResponse];
      }

      dispatch(githubActions.setUserAndOrgs(comboboxItems));
    } catch (error) {
      AppLog.errorToast('We have a problem. Please try again later.');
      dispatch(githubActions.setQueryState('failed'));
    }
  }
);
