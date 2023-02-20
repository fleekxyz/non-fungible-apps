import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';

import { QueryClient, QueryClientProvider } from 'react-query';

import { WagmiConfig, createClient } from 'wagmi';
import { polygon, polygonMumbai, mainnet } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultClient } from 'connectkit';

const alchemyId = import.meta.env.VITE_ALCHEMY_API_KEY;
const chains = [polygonMumbai];

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const client = createClient(
  getDefaultClient({
    appName: 'NFA Mumbai',
    alchemyId,
    chains,
  })
);

type ProviderProps = {
  children: React.ReactNode;
};

export const Providers: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig client={client}>
          <ConnectKitProvider>{children}</ConnectKitProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </ReduxProvider>
  );
};
