import { forwardRef, Heading, HeadingProps } from '@chakra-ui/react';

type HeadingTileProps = HeadingProps & {
  heading: string;
  info: string;
};

export const TileInfo = forwardRef<HeadingTileProps, 'h2'>(
  ({ heading, info, ...headingProps }, ref) => (
    <>
      <Heading {...headingProps}>{heading}</Heading>
      <p>{info}</p>
    </>
  )
);

