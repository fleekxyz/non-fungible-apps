import { FaWallet } from 'react-icons/fa';
import { IoExitOutline } from 'react-icons/io5';
import { AiOutlineCopy } from 'react-icons/ai';

export const IconLibrary = Object.freeze({
  wallet: FaWallet,
  'log-out': IoExitOutline,
  copy: AiOutlineCopy,
});

export type IconName = keyof typeof IconLibrary;

export type IconType<Name extends IconName> = typeof IconLibrary[Name];

