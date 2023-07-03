import { createAsyncThunk } from '@reduxjs/toolkit';
import { initializeApp } from 'firebase/app';
import { getAuth, GithubAuthProvider, signInWithPopup } from 'firebase/auth';

import { env } from '@/constants';
import { githubActions, RootState } from '@/store';
import { AppLog } from '@/utils';

const GithubScopes = ['repo', 'read:org', 'read:user', 'public_repo', 'user'];

const firebaseConfig = {
  apiKey: env.firebase.apiKey,
  authDomain: env.firebase.authDomain,
  projectId: env.firebase.projectId,
  storageBucket: env.firebase.storageBucket,
  messagingSenderId: env.firebase.messagingSenderId,
  appId: env.firebase.appId,
  // measurementId: env.firebase.measurementId,  TODO remove is not needed cause we're not using analytics
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GithubAuthProvider();
GithubScopes.forEach((scope) => provider.addScope(scope));

const auth = getAuth(app);

export const login = createAsyncThunk(
  'github/login',
  async (_, { dispatch, getState }) => {
    if ((getState() as RootState).github.state === 'loading') return;

    try {
      dispatch(githubActions.setState('loading'));

      const response = await signInWithPopup(auth, provider);

      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(response);

      if (credential && credential.accessToken) {
        dispatch(githubActions.setToken(credential.accessToken));
      } else {
        //something went wrong and have no token
        throw Error('Invalid response type');
      }
    } catch (error) {
      AppLog.errorToast('Github login failed. Please try again later.', error);
      dispatch(githubActions.setState('failed'));
    }
  }
);
