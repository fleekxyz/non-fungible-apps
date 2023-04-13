import { forwardStyledRef } from '@/theme';

import { AvatarStyles as AS } from './avatar.styles';

export const Avatar = forwardStyledRef<HTMLDivElement, AS.RootProps>(
  ({ imageProps = {}, src, alt, ...rootProps }, ref) => {
    return (
      <AS.Root {...rootProps} ref={ref}>
        <AS.Image src={src} alt={alt} {...imageProps} />
      </AS.Root>
    );
  }
);

Avatar.displayName = 'Avatar';
