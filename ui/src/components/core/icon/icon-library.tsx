import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle';
import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
import { AiOutlineDown } from '@react-icons/all-files/ai/AiOutlineDown';
import { AiOutlineTwitter } from '@react-icons/all-files/ai/AiOutlineTwitter';
import { BiSearch } from '@react-icons/all-files/bi/BiSearch';
import { IoArrowBackCircleSharp } from '@react-icons/all-files/io5/IoArrowBackCircleSharp';
import { IoCheckmarkCircleSharp } from '@react-icons/all-files/io5/IoCheckmarkCircleSharp';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { IoCloudUploadSharp } from '@react-icons/all-files/io5/IoCloudUploadSharp';
import { IoInformationCircleSharp } from '@react-icons/all-files/io5/IoInformationCircleSharp';
import { IoLogoGithub } from '@react-icons/all-files/io5/IoLogoGithub';

import { EthereumIcon, MetamaskIcon } from './custom';
import { ErrorIcon } from './custom/error';

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
