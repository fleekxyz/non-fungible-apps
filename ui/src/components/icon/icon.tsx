import {
  forwardRef,
  IconProps as IconPropsChakra,
  Icon as IconChakra,
} from '@chakra-ui/react';
import { IconLibrary, IconName, IconType } from './icon-types';

export type IconComponentProps = IconPropsChakra & { name: IconName };

export const Icon = forwardRef<IconComponentProps, 'svg'>(
  ({ name, ...iconProps }, ref) => {
    const IconElement: IconType<typeof name> = IconLibrary[name];
    return <IconChakra as={IconElement} {...iconProps} ref={ref} />;
  }
);

