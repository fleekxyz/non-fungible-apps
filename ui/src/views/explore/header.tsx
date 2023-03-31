import { Button } from '@/components';
import { Link } from 'react-router-dom';
import { Header as HS } from './header.styles';

export const Header = () => (
  <HS.Container>
    <HS.Text>
      <HS.GrayText>
        Created with a focus on decentralizing your applications,
      </HS.GrayText>
      <HS.WhiteText> NFAs are the only thing you need.</HS.WhiteText>
    </HS.Text>
    <HS.ButtonContainer>
      <Button as={Link} to="/mint" colorScheme="blue" variant="outline">
        Create an NFA
      </Button>
      {/* TODO replace with create ap route */}
      <Button as={Link} to="/create-ap" colorScheme="gray" variant="outline">
        Host an Access Point
      </Button>
    </HS.ButtonContainer>
  </HS.Container>
);
