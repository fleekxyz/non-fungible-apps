import { forwardRef } from 'react';

import { IconStyles } from './icon.styles';
import { IconLibrary, IconName, IconType } from './icon-library';

export type IconProps = {
  name: IconName;
} & React.ComponentProps<typeof IconStyles.Container>;

export const Icon: React.FC<IconProps> = forwardRef<HTMLSpanElement, IconProps>(
  (props, ref) => {
    const { name, ...rest } = props;
    const IconElement: IconType<typeof name> = IconLibrary[name];

    return (
      <IconStyles.Container {...rest} ref={ref}>
        <IconElement style={{ width: '1em', height: '1em' }} />
      </IconStyles.Container>
    );
  }
);

Icon.displayName = 'Icon';
