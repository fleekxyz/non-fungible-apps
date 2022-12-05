import React from 'react';
import './list-sites.css';
import { Heading, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export const ListSites = () => {
  const navigate = useNavigate();
  return (
    <div className="main">
      <Heading>Welcome to Sites as NFTs by Fleek</Heading>
      <Button onClick={() => navigate('/mint-site')} mt={10}>
        Mint your site
      </Button>
    </div>
  );
};

