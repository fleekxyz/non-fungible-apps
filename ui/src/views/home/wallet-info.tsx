import { useAccount } from 'wagmi';
import { EnsInfo } from './ens-info';

// Make sure that this component is wrapped with ConnectKitProvider
export const WalletInfo = () => {
  const { address, isConnecting, isDisconnected } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected to wallet', address, connector, isReconnected);
    },
  });
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <>
      <div>Connected Wallet: {address}</div>
      {/* {address && <EnsInfo address={address} />} */}
    </>
  );
};
