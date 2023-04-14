import * as Avatar from '@radix-ui/react-avatar';

import { styled } from '@/theme';

export abstract class AvatarStyles {
  static readonly Root = styled(Avatar.Root, {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    overflow: 'hidden',
    userSelect: 'none',
    borderRadius: '100%',
    backgroundColor: '$slate2',
  });

  static readonly Image = styled(Avatar.Image, {
    width: '1em',
    height: '1em',
    objectFit: 'cover',
    borderRadius: 'inherit',
  });

  static readonly Fallback = styled(Avatar.Fallback, {
    width: '1em',
    height: '1em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$slate2',
    color: '$slate12',
    fontSize: '$sm',
    fontWeight: '$medium',
  });
}

export namespace AvatarStyles {
  export type RootProps = React.ComponentPropsWithRef<
    typeof AvatarStyles.Root
  > & {
    /**
     * Fallback node.
     * In case of string, transformed to upper case and sliced to second letter.
     */
    fallback?: React.ReactNode;
    /**
     * Source of the image.
     * If not provided, fallback will be used.
     */
    src?: ImageProps['src'];
    /**
     * Alt text of the image.
     */
    alt?: ImageProps['alt'];

    /**
     * Props of the image tag.
     * @see {@link AvatarImageProps}
     * @default {}
     */
    imageProps?: ImageProps;
    /**
     * Props of the fallback tag.
     * @see {@link AvatarFallbackProps}
     * @default {}
     */
    fallbackProps?: FallbackProps;
  };

  export type ImageProps = React.ComponentPropsWithRef<
    typeof AvatarStyles.Image
  >;

  export type FallbackProps = React.ComponentPropsWithRef<
    typeof AvatarStyles.Fallback
  >;
}
