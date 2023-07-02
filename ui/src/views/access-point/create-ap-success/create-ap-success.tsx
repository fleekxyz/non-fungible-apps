import { Button, Card, CustomCardHeader, Flex, Icon, Text } from '@/components';

import { CreateAccessPoint } from '../create-ap.context';
import { DisplayText } from '../display-text';
import { CreateApSuccessStyles as S } from './create-ap-success.styles';

export const CreateAccessPointSuccess: React.FC = () => {
  const { nfa } = CreateAccessPoint.useContext();
  const {
    transaction: { data },
  } = CreateAccessPoint.useTransactionContext();

  return (
    <S.Container>
      <CustomCardHeader.Success title="Hosting Successful" />
      <Card.Body>
        <Flex css={{ flexDirection: 'column', gap: '$6' }}>
          <Text css={{ fontSize: '$sm', color: '$slate11' }}>
            {`You have successfully created a ${nfa.name} app. You may add it in your wallet using the following data:`}
          </Text>
          <DisplayText label="Contract Address" value={data?.to} />
          <DisplayText
            label="Token ID"
            value={'0' /* TODO: add data from transaction if possible */}
          />

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
