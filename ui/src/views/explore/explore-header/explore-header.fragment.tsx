import { Link } from 'react-router-dom';

import { Button } from '@/components';

import { ExploreHeaderStyles as S } from './explore-header.styles';

export const ExploreHeaderFragment: React.FC = () => (
  <S.Container>
    <S.Text>
      <S.GrayText>
        Created with a focus on decentralizing your applications,
      </S.GrayText>
      <S.WhiteText> NFAs are the only thing you need.</S.WhiteText>
    </S.Text>
    <S.ButtonContainer>
      <Button as={Link} to="/mint" colorScheme="blue" variant="outline">
        Create an NFA
      </Button>
      {/* TODO replace with create ap route */}
      <Button as={Link} to="/create-ap" colorScheme="gray" variant="outline">
        Host an Access Point
      </Button>
    </S.ButtonContainer>
  </S.Container>
);
