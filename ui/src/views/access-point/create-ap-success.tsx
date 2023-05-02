import {
  Button,
  Card,
  CustomCardContainer,
  CustomCardHeader,
  Flex,
  Icon,
  Text,
} from '@/components';

import { CreateAccessPoint } from './create-ap.context';
import { AccessPointDataFragment } from './create-ap-preview';

export const CreateAccessPointSuccess: React.FC = () => {
  const { nfa } = CreateAccessPoint.useContext();
  return (
    <CustomCardContainer>
      <CustomCardHeader.Success title="Hosting Successful" />
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
    </CustomCardContainer>
  );
};
