import { ArrowBackIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const HomeButton = () => {
  return (
    <IconButton
      as={Link}
      to="/home"
      aria-label="back home"
      icon={<ArrowBackIcon />}
    />
  );
};

