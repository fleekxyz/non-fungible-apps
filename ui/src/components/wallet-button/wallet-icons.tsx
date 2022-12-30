import { Icon, Image } from '@chakra-ui/react';
import { FaWallet } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { AiOutlineCopy } from 'react-icons/ai';
import Metamask from 'assets/MetaMask.png';
import { WalletType } from '.';

type ConnectedWalletIconProps = {
  provider: string;
};

export const WalletIcon = () => {
  return <Icon as={FaWallet} />;
};

export const DisconnectIcon = () => {
  return <Icon as={IoExitOutline} />;
};

export const CopyIcon = () => {
  return <Icon as={AiOutlineCopy} />;
};

export const ConnectedWalletIcon = ({ provider }: ConnectedWalletIconProps) => {
  switch (provider) {
    case WalletType.MetaMask:
    default:
      return <Image src={Metamask} height="25px" marginRight={'5px'} />;
  }
};

