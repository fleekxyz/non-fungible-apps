import { ApolloProvider } from './apollo-provider';
import { ConnectkitProvider } from './connectkit-provider';
import { ReactQueryProvider } from './react-query-provider';
import { ReduxProvider } from './redux-provider';

type ProviderProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProviderProps> = ({
  children,
}: ProviderProps) => {
  return (
    <ReduxProvider>
      <ReactQueryProvider>
        <ApolloProvider>
          <ConnectkitProvider>{children}</ConnectkitProvider>
        </ApolloProvider>
      </ReactQueryProvider>
    </ReduxProvider>
  );
};
