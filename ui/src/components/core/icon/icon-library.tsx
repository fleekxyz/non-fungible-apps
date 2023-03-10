import { IoLogoGithub } from '@react-icons/all-files/io5/IoLogoGithub';
import { IoArrowBackCircleSharp } from '@react-icons/all-files/io5/IoArrowBackCircleSharp';
import { IoInformationCircleSharp } from '@react-icons/all-files/io5/IoInformationCircleSharp';
import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
import { AiOutlineDown } from '@react-icons/all-files/ai/AiOutlineDown';
import { BiSearch } from '@react-icons/all-files/bi/BiSearch';
import { IoCloudUploadSharp } from '@react-icons/all-files/io5/IoCloudUploadSharp';
import { MetamaskIcon, EthereumIcon } from './custom';
import { IoCheckmarkCircleSharp } from '@react-icons/all-files/io5/IoCheckmarkCircleSharp';
import { AiOutlineTwitter } from '@react-icons/all-files/ai/AiOutlineTwitter';
import { ErrorIcon } from './custom/error';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle';

export const IconLibrary = Object.freeze({
  back: IoArrowBackCircleSharp,
  check: AiOutlineCheck,
  'check-circle': IoCheckmarkCircleSharp,
  'chevron-down': AiOutlineDown,
  close: IoClose,
  error: ErrorIcon,
  ethereum: EthereumIcon,
  github: IoLogoGithub,
  info: IoInformationCircleSharp,
  upload: IoCloudUploadSharp,
  metamask: MetamaskIcon, //remove if not used
  search: BiSearch,
  success: AiFillCheckCircle,
  twitter: AiOutlineTwitter,
});

export type IconName = keyof typeof IconLibrary;

export type IconType<Name extends IconName> = (typeof IconLibrary)[Name];
