import { Link } from 'react-router-dom';

import { Flex } from '@/components';

export const Home: React.FC = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <h1>Home</h1>
      <Link to="/mint">
        <u>Mint NFA!</u>
      </Link>
    </Flex>
  );
};
