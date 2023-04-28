import { Button, Card, Flex, Icon, IconButton, Text } from '@/components';

import { CreateAccessPoint } from './create-ap.context';
import { AccessPointDataFragment } from './create-ap-preview';

export const CreateAccessPointSuccess: React.FC = () => {
  const { nfa } = CreateAccessPoint.useContext();
  return (
    <Card.Container css={{ width: '$107h' }}>
      <Card.Heading
        title="Hosting Successful"
        leftIcon={
          <Icon
            name="check-circle"
            css={{ color: '$green11', fontSize: '$xl', mr: '$2' }}
          />
        }
        rightIcon={
          <IconButton
            aria-label="Add"
            colorScheme="gray"
            variant="link"
            icon={<Icon name="info" />}
          />
        }
      />
      <Card.Body>
        <Flex css={{ flexDirection: 'column', gap: '$6' }}>
          <Text css={{ fontSize: '$sm', color: '$slate11' }}>
            {`You have successfully hosted a ${nfa.name} frontend on your own domain.`}
          </Text>
          <AccessPointDataFragment />
          <Flex css={{ flexDirection: 'column', gap: '$4' }}>
            <Button
              colorScheme="blue"
              variant="solid"
              leftIcon={<Icon name="twitter" />}
            >
              Tweet about your frontend!
            </Button>
            <Button>Manage Frontend</Button>
          </Flex>
        </Flex>
      </Card.Body>
    </Card.Container>
  );
};
