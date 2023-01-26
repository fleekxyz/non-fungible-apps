import { Flex } from '../../layout';
import { Dropdown, DopdownItemProps } from './';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
};

const items: DopdownItemProps[] = [
  {
    value: '1',
    label: 'Item 1',
  },
  {
    value: '2',
    label: 'Item 2',
  },
  {
    value: '3',
    label: 'Item 3',
  },
  {
    value: '4',
    label: 'Github',
    icon: 'github',
  },
];

export const Default = () => {
  return (
    <Flex css={{ gap: '$2', height: '500px', flexDirection: 'column' }}>
      {/* <Dropdown /> */}
      <Dropdown withSearch items={items} />
    </Flex>
  );
};
