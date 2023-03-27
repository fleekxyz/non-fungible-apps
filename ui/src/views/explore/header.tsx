import { Button, Flex } from '@/components';
import { Header as HS } from './header.styles';
export const Header = () => (
  <HS.Container>
    <HS.Text>
      <HS.GrayText>
        Created with a focus on decentralizing your applications,
      </HS.GrayText>
      <HS.WhiteText>NFAs are the only thing you need.</HS.WhiteText>
    </HS.Text>
    <Flex>
      <Button colorScheme="blue" variant="ghost">
        Create an NFA
      </Button>
      <Button colorScheme="gray" variant="ghost">
        Host an Access Point
      </Button>
    </Flex>
  </HS.Container>
);
