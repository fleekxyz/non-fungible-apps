import { Box, Image } from '@chakra-ui/react';
import React from 'react';

interface Props {
  height?: number;
  width?: number;
  image: string;
}

export const ImagePreview: React.FC<Props> = ({ height, width, image }) => {
  return (
    <Box boxSize="sm">
      {/* TODO add fallback Image */}
      <Image
        src={image}
        {...(height && { height })}
        {...(width && { width })}
        fallbackSrc="https://via.placeholder.com/150"
      />
    </Box>
  );
};

