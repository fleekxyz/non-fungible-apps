import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';

export namespace GithubState {
  export type Token = string;
}

export interface GithubState {
  token: GithubState.Token;
}

const initialState: GithubState = {
  token: '',
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<GithubState.Token>) => {
      state.token = action.payload;
    },
  },
});

export const githubActions = githubSlice.actions;

const selectGithubState = (state: RootState): GithubState => state.github;

export const useGithubState = (): GithubState =>
  useAppSelector(selectGithubState);

export default githubSlice.reducer;
