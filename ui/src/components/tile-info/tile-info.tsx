import {
  Flex,
  forwardRef,
  Heading,
  HeadingProps,
  Text,
} from '@chakra-ui/react';

type TileInfoProps = HeadingProps & {
  heading: string;
  info: React.ReactNode;
  widthText?: number;
  textAlignText?: 'center' | 'left';
  direction?: 'column' | 'row';
  alignItems?: string;
};

export const TileInfo = forwardRef<TileInfoProps, 'h2'>(
  (
    {
      heading,
      info,
      widthText = 250,
      textAlignText = 'center',
      direction = 'column',
      alignItems = 'center',
      ...headingProps
    },
    ref
  ) => (
    <Flex direction={direction} alignItems={alignItems}>
      <Heading ref={ref} {...headingProps}>
        {heading}
      </Heading>
      <Text
        width={widthText}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        textAlign={textAlignText}
      >
        {info}
      </Text>
    </Flex>
  )
);

