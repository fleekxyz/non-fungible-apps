import { IoLogoGithub } from '@react-icons/all-files/io5/IoLogoGithub';
import { IoArrowBackCircleSharp } from '@react-icons/all-files/io5/IoArrowBackCircleSharp';
import { IoInformationCircleSharp } from '@react-icons/all-files/io5/IoInformationCircleSharp';
import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
import { AiOutlineDown } from '@react-icons/all-files/ai/AiOutlineDown';
import { BiSearch } from '@react-icons/all-files/bi/BiSearch';
import { IoCloudUploadSharp } from '@react-icons/all-files/io5/IoCloudUploadSharp';
import { MetamaskIcon, EthereumIcon } from './custom';

export const IconLibrary = Object.freeze({
  back: IoArrowBackCircleSharp,
  check: AiOutlineCheck,
  'chevron-down': AiOutlineDown,
  ethereum: EthereumIcon,
  github: IoLogoGithub,
  info: IoInformationCircleSharp,
  upload: IoCloudUploadSharp,
  metamask: MetamaskIcon, //remove if not used
  search: BiSearch,
});

export type IconName = keyof typeof IconLibrary;

export type IconType<Name extends IconName> = typeof IconLibrary[Name];
