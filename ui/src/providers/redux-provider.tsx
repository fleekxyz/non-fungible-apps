import { store } from '@/store';
import { Provider } from 'react-redux';

type ReduxProviderProps = {
  children: React.ReactNode;
};

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
