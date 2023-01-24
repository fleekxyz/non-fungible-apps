import { Flex } from '../../layout';
import { Dropdown } from './';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
};

export const Default = () => {
  return (
    <Flex css={{ gap: '$2' }}>
      <Dropdown />
      <Dropdown withSearch />
    </Flex>
  );
};
