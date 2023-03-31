import { Link } from 'react-router-dom';

import { Flex } from '@/components';

import { NFAList } from './nfa-list/nfa-list';

export const Home: React.FC = () => {
  return (
    <Flex css={{ flexDirection: 'column' }}>
      <h1>Home</h1>
      <Link to="/mint">
        <u>Mint NFA!</u>
      </Link>
      <NFAList />
    </Flex>
  );
};
