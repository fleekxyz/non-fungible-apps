import { Provider } from 'react-redux';

import { store } from '@/store';

type ReduxProviderProps = {
  children: React.ReactNode;
};

export const ReduxProvider: React.FC<ReduxProviderProps> = ({
  children,
}: ReduxProviderProps) => <Provider store={store}>{children}</Provider>;
