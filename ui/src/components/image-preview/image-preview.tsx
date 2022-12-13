import { forwardRef, Image, ImageProps } from '@chakra-ui/react';

type ImagePreviewProps = ImageProps & {
  image: string;
};

export const ImagePreview = forwardRef<ImagePreviewProps, 'img'>(
  ({ image, ...propsImage }, ref) => {
    return (
      <>
        {/* TODO add fallback Image */}
        <Image
          ref={ref}
          src={image}
          {...propsImage}
          fallbackSrc="https://via.placeholder.com/150"
        />
      </>
    );
  }
);

