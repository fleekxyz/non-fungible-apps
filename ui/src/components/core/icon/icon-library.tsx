import { IoLogoGithub } from '@react-icons/all-files/io5/IoLogoGithub';
import { IoArrowBackCircleSharp } from '@react-icons/all-files/io5/IoArrowBackCircleSharp';
import { IoInformationCircleSharp } from '@react-icons/all-files/io5/IoInformationCircleSharp';
import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
import { AiOutlineDown } from '@react-icons/all-files/ai/AiOutlineDown';
import { BiSearch } from '@react-icons/all-files/bi/BiSearch';
import { IoCloudUploadSharp } from '@react-icons/all-files/io5/IoCloudUploadSharp';
import {
  MetamaskIcon,
  EthereumIcon,
  ErrorIcon,
  FleekName,
  BetaTag,
  FleekLogo,
} from './custom';
import { IoCheckmarkCircleSharp } from '@react-icons/all-files/io5/IoCheckmarkCircleSharp';
import { AiOutlineTwitter } from '@react-icons/all-files/ai/AiOutlineTwitter';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle';
import { BiGitBranch } from '@react-icons/all-files/bi/BiGitBranch';

export const IconLibrary = Object.freeze({
  back: IoArrowBackCircleSharp,
  betaTag: BetaTag,
  branch: BiGitBranch,
  check: AiOutlineCheck,
  'check-circle': IoCheckmarkCircleSharp,
  'chevron-down': AiOutlineDown,
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
  success: AiFillCheckCircle,
  twitter: AiOutlineTwitter,
});

export type IconName = keyof typeof IconLibrary;

export type IconType<Name extends IconName> = (typeof IconLibrary)[Name];
