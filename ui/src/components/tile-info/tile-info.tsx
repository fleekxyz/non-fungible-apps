import { Heading } from '@chakra-ui/react';
import React from 'react';

interface Props {
  size: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  heading: string;
  info: string;
}

export const TileInfo: React.FC<Props> = ({ size, heading, info }) => (
  <>
    <Heading size={size}>{heading}</Heading>
    <p>{info}</p>
  </>
);

