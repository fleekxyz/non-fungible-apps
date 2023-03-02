import { Flex } from '@/components';
import { Link } from 'react-router-dom';
import { NFAList } from '../nfa-list/nfa-list';

export const Home = () => {
  return (
    <Flex css={{ flexDirection: 'column', margin: '$60' }}>
      <h1>Home</h1>
      <Link to="/mint">
        <u>Mint NFA!</u>
      </Link>
      <NFAList />
    </Flex>
  );
};
