import { Icon } from '@chakra-ui/react';
import { FaWallet } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { AiOutlineCopy } from 'react-icons/ai';

export const WalletIcon = () => {
  return <Icon as={FaWallet} />;
};

export const DisconnectIcon = () => {
  return <Icon as={IoExitOutline} />;
};

export const CopyIcon = () => {
  return <Icon as={AiOutlineCopy} />;
};
