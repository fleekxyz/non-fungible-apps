import { ComboboxItem } from '@/components';
import { RootState } from '@/store';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GithubClient, UserData } from '../github-client';
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
      const user = await githubClient.fetchUser();
      const orgs = await githubClient.fetchOrgs();

      let comboboxItems: UserData[] = [];

      if (user) {
        comboboxItems.push(user);
      }

      if (orgs) {
        comboboxItems = [...comboboxItems, ...orgs];
      }

      dispatch(githubActions.setUserAndOrgs(comboboxItems));
    } catch (error) {
      console.log(error);
      dispatch(githubActions.setQueryState('failed'));
    }
  }
);
