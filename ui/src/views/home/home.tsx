import React, { useState } from 'react';
import { Heading, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';
import { ListSites } from './list';
import { Combobox, ComboboxItem, Dropdown } from '@/components/core/combobox';

export const Home = () => {
  const [value, setValue] = useState<ComboboxItem>();
  const [value2, setValue2] = useState<ComboboxItem>();
  const items: ComboboxItem[] = [
    {
      value: '1',
      label: 'Item 1',
      icon: 'github',
    },
    {
      value: '2',
      label: 'Item 2',
      icon: 'metamask',
    },
    {
      value: '3',
      label: 'Item 3',
      icon: 'ethereum',
    },
    {
      value: '4',
      label: 'Github',
      icon: 'github',
    },
  ];

  return (
    <Flex
      flexDirection="row"
      alignItems="center"
      justifyContent={'center'}
      height={'100vh'}
    >
      {/* <Heading marginTop="80px">Welcome to Sites as NFTs by Fleek</Heading>
      <Button as={Link} to="/mint-site" mt="20px" mb="50px">
        Mint your site
      </Button> */}
      {/* <Flex> */}
      <div className="w-72 mr-10">
        <Dropdown
          items={[items[0], items[1]]}
          selectedValue={value2}
          onChange={setValue2}
        />
      </div>
      <div className="w-60 ">
        <Combobox items={items} selectedValue={value} onChange={setValue} />
      </div>
      {/* </Flex> */}

      {/* <ListSites /> */}
    </Flex>
  );
};
