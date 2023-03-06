import { ToastProvider } from '@/components';
import { ConnectkitProvider } from './connectkit-provider';
import { ReactQueryProvider } from './react-query-provider';
import { ReduxProvider } from './redux-provider';

type ProviderProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        {/* <ToastProvider> */}
        <ConnectkitProvider>{children}</ConnectkitProvider>
        {/* </ToastProvider> */}
      </ReactQueryProvider>
    </ReduxProvider>
  );
};
