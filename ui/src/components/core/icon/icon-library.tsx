import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle';
import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
import { AiOutlineTwitter } from '@react-icons/all-files/ai/AiOutlineTwitter';
import { BiGitBranch } from '@react-icons/all-files/bi/BiGitBranch';
import { BiSearch } from '@react-icons/all-files/bi/BiSearch';
import { BsFillSquareFill } from '@react-icons/all-files/bs/BsFillSquareFill';
import { IoArrowBackCircleSharp } from '@react-icons/all-files/io5/IoArrowBackCircleSharp';
import { IoCheckmarkCircleSharp } from '@react-icons/all-files/io5/IoCheckmarkCircleSharp';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { IoCloudUploadSharp } from '@react-icons/all-files/io5/IoCloudUploadSharp';
import { IoInformationCircleSharp } from '@react-icons/all-files/io5/IoInformationCircleSharp';
import { IoLogoGithub } from '@react-icons/all-files/io5/IoLogoGithub';

import {
  BetaTag,
  ChevronDownIcon,
  ErrorIcon,
  EthereumIcon,
  FleekLogo,
  FleekName,
  MetamaskIcon,
} from './custom';

export const IconLibrary = Object.freeze({
  back: IoArrowBackCircleSharp,
  betaTag: BetaTag,
  branch: BiGitBranch,
  check: AiOutlineCheck,
  'check-circle': IoCheckmarkCircleSharp,
  'chevron-down': ChevronDownIcon,
  close: IoClose,
  error: ErrorIcon,
  ethereum: EthereumIcon,
  fleekLogo: FleekLogo,
  fleekName: FleekName,
  github: IoLogoGithub,
  info: IoInformationCircleSharp,
  upload: IoCloudUploadSharp,
  metamask: MetamaskIcon, //remove if not used
  search: BiSearch,
  square: BsFillSquareFill,
  success: AiFillCheckCircle,
  twitter: AiOutlineTwitter,
});

export type IconName = keyof typeof IconLibrary;

export type IconType<Name extends IconName> = (typeof IconLibrary)[Name];
