import { Image } from '@chakra-ui/react';
import { metamaskIcon } from 'assets';
import { WalletType } from './wallet.utils';

type ConnectedWalletIconProps = {
  provider: string;
};
export const ConnectedWalletIcon = ({ provider }: ConnectedWalletIconProps) => {
  switch (provider) {
    case WalletType.MetaMask:
    default:
      return <Image src={metamaskIcon} height="25px" marginRight={'5px'} />;
  }
};

