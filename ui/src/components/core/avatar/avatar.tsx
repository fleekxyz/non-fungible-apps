import { forwardRef } from 'react';
import { AvatarProps, AvatarStyles } from './avatar.styles';

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { fallback, fallbackProps, imageProps = {}, src, alt, css, ...rootProps },
    ref
  ) => {
    return (
      <AvatarStyles.Root {...rootProps} ref={ref} css={css}>
        <AvatarStyles.Image src={src} alt={alt} {...imageProps} />
      </AvatarStyles.Root>
    );
  }
);
