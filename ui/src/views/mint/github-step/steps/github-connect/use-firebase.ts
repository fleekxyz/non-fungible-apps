import { useCallback } from 'react';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { useAppDispatch, githubActions } from '@/store';
import { env } from '@/constants';

const GithubScopes = ['repo', 'read:org', 'read:user', 'public_repo', 'user'];

export type UseFirebaseOptions = {
  onError: (error: Error) => void;
  onSuccess: () => void;
};

export const useFirebase = ({ onError, onSuccess }: UseFirebaseOptions) => {
  const dispatch = useAppDispatch();

  const firebaseConfig = {
    apiKey: env.firebase.apiKey,
    authDomain: env.firebase.authDomain,
    projectId: env.firebase.projectId,
    storageBucket: env.firebase.storageBucket,
    messagingSenderId: env.firebase.messagingSenderId,
    appId: env.firebase.appId,
    measurementId: env.firebase.measurementId,
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const provider = new GithubAuthProvider();
  GithubScopes.forEach((scope) => provider.addScope(scope));

  const auth = getAuth(app);

  const login = useCallback(async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);

        if (credential && credential.accessToken) {
          dispatch(githubActions.setToken(credential.accessToken));
          onSuccess();
        } else {
          //something went wrong and have no token
          onError(new Error('No token'));
        }
      })
      .catch((error) => {
        onError(error);
        //TODO maybe log this error
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });
  }, []);

  return { login };
};
