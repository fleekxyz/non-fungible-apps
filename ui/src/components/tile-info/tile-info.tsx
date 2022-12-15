import {
  Flex,
  forwardRef,
  Heading,
  HeadingProps,
  Text,
} from '@chakra-ui/react';

type TileInfoProps = HeadingProps & {
  heading: string;
  info: string;
  width?: number;
};

export const TileInfo = forwardRef<TileInfoProps, 'h2'>(
  ({ heading, info, width = 250, ...headingProps }, ref) => (
    <Flex direction="column" alignItems="center">
      <Heading ref={ref} {...headingProps}>
        {heading}
      </Heading>
      <Text
        width={width}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
        textAlign="center"
      >
        {info}
      </Text>
    </Flex>
  )
);

