import { AiFillCheckCircle } from '@react-icons/all-files/ai/AiFillCheckCircle';
import { AiOutlineCheck } from '@react-icons/all-files/ai/AiOutlineCheck';
import { AiOutlineTwitter } from '@react-icons/all-files/ai/AiOutlineTwitter';
import { AiOutlineUnorderedList } from '@react-icons/all-files/ai/AiOutlineUnorderedList';
import { BiGitBranch } from '@react-icons/all-files/bi/BiGitBranch';
import { BiSearch } from '@react-icons/all-files/bi/BiSearch';
import { BsFillSquareFill } from '@react-icons/all-files/bs/BsFillSquareFill';
import { FaBars } from '@react-icons/all-files/fa/FaBars';
import { FaChevronRight } from '@react-icons/all-files/fa/FaChevronRight';
import { FaExternalLinkAlt } from '@react-icons/all-files/fa/FaExternalLinkAlt';
import { IoArrowBackCircleSharp } from '@react-icons/all-files/io5/IoArrowBackCircleSharp';
import { IoCheckmarkCircleSharp } from '@react-icons/all-files/io5/IoCheckmarkCircleSharp';
import { IoClose } from '@react-icons/all-files/io5/IoClose';
import { IoCloudUploadSharp } from '@react-icons/all-files/io5/IoCloudUploadSharp';
import { IoGridOutline } from '@react-icons/all-files/io5/IoGridOutline';
import { IoInformationCircleSharp } from '@react-icons/all-files/io5/IoInformationCircleSharp';
import { IoLogoGithub } from '@react-icons/all-files/io5/IoLogoGithub';
import { MdVerifiedUser } from '@react-icons/all-files/md/MdVerifiedUser';

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
  'beta-tag': BetaTag,
  branch: BiGitBranch,
  check: AiOutlineCheck,
  'check-circle': IoCheckmarkCircleSharp,
  'chevron-down': ChevronDownIcon,
  'chevron-right': FaChevronRight,
  close: IoClose,
  error: ErrorIcon,
  ethereum: EthereumIcon,
  'external-link': FaExternalLinkAlt,
  'fleek-logo': FleekLogo,
  'fleek-name': FleekName,
  github: IoLogoGithub,
  grid: IoGridOutline,
  info: IoInformationCircleSharp,
  list: AiOutlineUnorderedList,
  menu: FaBars,
  metamask: MetamaskIcon, //remove if not used
  search: BiSearch,
  square: BsFillSquareFill,
  success: AiFillCheckCircle,
  twitter: AiOutlineTwitter,
  upload: IoCloudUploadSharp,
  verified: MdVerifiedUser,
});

export type IconName = keyof typeof IconLibrary;

export type IconType<Name extends IconName> = (typeof IconLibrary)[Name];
