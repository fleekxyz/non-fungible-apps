import { Flex } from '@/components';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <h1>Home</h1>
      <Link to="/mint">
        <u>Mint NFA!</u>
      </Link>
    </Flex>
  );
};
