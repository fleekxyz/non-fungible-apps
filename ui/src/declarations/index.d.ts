import { Dispatch, SetStateAction } from 'react';

declare global {
  type ReactState<S> = [S, Dispatch<SetStateAction<S>>];
}
