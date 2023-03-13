import * as Avatar from '@radix-ui/react-avatar';

import { dripStitches } from '@/theme';

const { styled } = dripStitches;

export abstract class AvatarStyles {
  static readonly Root = styled(Avatar.Root, {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
    overflow: 'hidden',
    userSelect: 'none',
    width: '$5',
    height: '$5',
    borderRadius: '100%',
    backgroundColor: '$slate2',
    mr: '$2',
  });

  static readonly Image = styled(Avatar.Image, {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 'inherit',
  });

  static readonly Fallback = styled(Avatar.Fallback, {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$slate2',
    color: '$slate12',
    fontSize: '$sm',
    fontWeight: '$medium',
  });
}

export type AvatarProps = React.ComponentProps<typeof AvatarStyles.Root> & {
  /**
   * Fallback node.
   * In case of string, transformed to upper case and sliced to second letter.
   */
  fallback?: React.ReactNode;
  /**
   * Source of the image.
   * If not provided, fallback will be used.
   */
  src?: AvatarImageProps['src'];
  /**
   * Alt text of the image.
   */
  alt?: AvatarImageProps['alt'];

  /**
   * Props of the image tag.
   * @see {@link AvatarImageProps}
   * @default {}
   */
  imageProps?: AvatarImageProps;
  /**
   * Props of the fallback tag.
   * @see {@link AvatarFallbackProps}
   * @default {}
   */
  fallbackProps?: AvatarFallbackProps;
};
export type AvatarImageProps = React.ComponentProps<typeof AvatarStyles.Image>;
export type AvatarFallbackProps = React.ComponentProps<
  typeof AvatarStyles.Fallback
>;
