import {
  ConnectKitProvider as ConnectKitProviderLib,
  getDefaultClient,
} from 'connectkit';
import { createClient, WagmiConfig } from 'wagmi';
import { polygonMumbai } from 'wagmi/chains';

import { env } from '@/constants';

const alchemyId = env.alchemy.id;
const chains = [polygonMumbai];

const wagmiClient = createClient(
  getDefaultClient({
    appName: env.alchemy.appName,
    alchemyId,
    chains,
  })
);

type ConnectKitProviderProps = {
  children: React.ReactNode;
};

export const ConnectkitProvider: React.FC<ConnectKitProviderProps> = ({
  children,
}: ConnectKitProviderProps) => (
  <WagmiConfig client={wagmiClient}>
    <ConnectKitProviderLib>{children}</ConnectKitProviderLib>
  </WagmiConfig>
);
