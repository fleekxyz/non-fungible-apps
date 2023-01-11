import { FaWallet } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { AiOutlineCopy } from 'react-icons/ai';
import { MetamaskIcon } from './custom';

export const IconLibrary = Object.freeze({
  copy: AiOutlineCopy,
  'log-out': IoExitOutline,
  metamask: MetamaskIcon,
  wallet: FaWallet,
});

export type IconName = keyof typeof IconLibrary;

export type IconType<Name extends IconName> = typeof IconLibrary[Name];
