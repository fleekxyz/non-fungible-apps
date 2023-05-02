import { Button, Card, CustomCardHeader, Flex, Icon, Text } from '@/components';

import { CreateAccessPoint } from '../create-ap.context';
import { AccessPointDataFragment } from '../create-ap-preview';
import { CreateApSuccessStyles as S } from './create-ap-success.styles';

export const CreateAccessPointSuccess: React.FC = () => {
  const { nfa } = CreateAccessPoint.useContext();
  return (
    <S.Container>
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
    </S.Container>
  );
};
