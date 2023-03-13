import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DropdownItem } from '@/components';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';

import * as asyncThunk from './async-thunk';
import { UserData } from './github-client';

export namespace GithubState {
  export type Token = string;

  export type State = 'disconnected' | 'loading' | 'connected';

  export type QueryUserAndOrganizations =
    | 'idle'
    | 'loading'
    | 'failed'
    | 'success';

  export type QueryLoading = 'idle' | 'loading' | 'failed' | 'success';

  export type UserAndOrganizations = Array<UserData>;

  export type Repository = {
    name: string;
    url: string;
  };

  export type Repositories = Array<Repository>;

  export type Branches = Array<DropdownItem>;
}

export interface GithubState {
  token: GithubState.Token;
  state: GithubState.State;
  userAndOrganizations: GithubState.UserAndOrganizations;
  queryUserAndOrganizations: GithubState.QueryUserAndOrganizations;
  queryLoading: GithubState.QueryLoading;
  repositories: GithubState.Repositories;
  branches: GithubState.Branches;
}

const initialState: GithubState = {
  token: '',
  state: 'disconnected',
  queryUserAndOrganizations: 'idle',
  queryLoading: 'idle',
  userAndOrganizations: [],
  repositories: [],
  branches: [],
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<GithubState.Token>) => {
      state.token = action.payload;
      state.state = 'connected';
    },
    setState: (
      state,
      action: PayloadAction<Exclude<GithubState.State, 'connected'>>
    ) => {
      state.token = '';
      state.state = action.payload;
    },
    setRepositories: (
      state,
      action: PayloadAction<GithubState.Repositories>
    ) => {
      state.repositories = action.payload;
      state.queryLoading = 'success';
    },
    setBranches: (state, action: PayloadAction<GithubState.Branches>) => {
      state.branches = action.payload;
      state.queryLoading = 'success';
    },
    setUserAndOrgs: (
      state,
      action: PayloadAction<GithubState.UserAndOrganizations>
    ) => {
      state.userAndOrganizations = action.payload;
      state.queryUserAndOrganizations = 'success';
    },
    setQueryUserState: (
      state,
      action: PayloadAction<Exclude<GithubState.QueryLoading, 'success'>>
    ) => {
      state.queryUserAndOrganizations = action.payload;
    },
    setQueryState: (
      state,
      action: PayloadAction<Exclude<GithubState.QueryLoading, 'success'>>
    ) => {
      state.queryLoading = action.payload;
    },
    disconnect: (state) => {
      state.token = '';
      state.state = 'disconnected';
    },
  },
});

export const githubActions = {
  ...githubSlice.actions,
  ...asyncThunk,
};

const selectGithubState = (state: RootState): GithubState => state.github;

export const useGithubStore = (): GithubState =>
  useAppSelector(selectGithubState);

export default githubSlice.reducer;
