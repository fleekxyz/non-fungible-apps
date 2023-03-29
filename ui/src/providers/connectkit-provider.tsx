import { WagmiConfig, createClient } from 'wagmi';
import { goerli } from 'wagmi/chains';
import {
  ConnectKitProvider as ConnectKitProviderLib,
  getDefaultClient,
} from 'connectkit';
import { env } from '@/constants';

const alchemyId = env.alchemy.id;
const chains = [goerli];

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
}) => (
  <WagmiConfig client={wagmiClient}>
    <ConnectKitProviderLib>{children}</ConnectKitProviderLib>
  </WagmiConfig>
);
