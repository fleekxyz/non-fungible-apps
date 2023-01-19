import { IoLogoGithub } from '@react-icons/all-files/io5/IoLogoGithub';
import { IoArrowBackCircleSharp } from '@react-icons/all-files/io5/IoArrowBackCircleSharp';
import { IoInformationCircleSharp } from '@react-icons/all-files/io5/IoInformationCircleSharp';
import { MetamaskIcon, EthereumIcon } from './custom';

export const IconLibrary = Object.freeze({
  back: IoArrowBackCircleSharp,
  ethereum: EthereumIcon,
  github: IoLogoGithub,
  info: IoInformationCircleSharp,
  metamask: MetamaskIcon, //remove if not used
});

export type IconName = keyof typeof IconLibrary;

export type IconType<Name extends IconName> = typeof IconLibrary[Name];
