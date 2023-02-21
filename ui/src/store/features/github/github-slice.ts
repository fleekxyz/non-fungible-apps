import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import * as asyncThunk from './async-thunk';

export namespace GithubState {
  export type Token = string;

  export type State = 'disconnected' | 'loading' | 'connected';
}

export interface GithubState {
  token: GithubState.Token;
  state: GithubState.State;
}

const initialState: GithubState = {
  token: '',
  state: 'disconnected',
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
